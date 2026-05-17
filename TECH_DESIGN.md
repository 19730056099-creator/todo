# 待办事项应用 — 技术设计文档

## 1. 项目结构

```
src/
├── components/
│   ├── Header.tsx            # 应用标题栏
│   ├── TodoForm.tsx          # 添加/编辑表单（复用同一组件）
│   ├── TodoList.tsx          # 待办列表容器
│   ├── TodoItem.tsx          # 单条待办卡片
│   ├── FilterBar.tsx         # 搜索框 + 分类/优先级/状态筛选
│   ├── StatsPanel.tsx        # 统计面板
│   └── ConfirmDialog.tsx     # 通用确认弹窗
├── store/
│   └── useTodoStore.ts       # Zustand store（状态 + 持久化中间件）
├── types/
│   └── todo.ts               # Todo 及相关类型定义
├── utils/
│   ├── storage.ts            # localStorage 读写封装
│   └── filter.ts             # 筛选与搜索纯函数
├── App.tsx                   # 根组件，组合布局
└── main.tsx                  # 入口
```

## 2. 组件树与职责

```
App
├── Header                    — 标题 + 新增待办按钮
├── StatsPanel                — 完成率、待办总数、分布统计
├── FilterBar                 — 搜索输入 + 分类/优先级/状态下拉
├── TodoList
│   └── TodoItem[]            — 每项：标题、优先级标签、到期日、操作按钮
├── TodoForm (条件渲染)         — 添加/编辑复用，props 区分模式
└── ConfirmDialog (条件渲染)    — 删除确认
```

### 组件状态说明

| 组件 | 内部状态 | 来自 Store |
|---|---|---|
| Header | — | — |
| StatsPanel | — | todos → 计算统计值 |
| FilterBar | 搜索词、各筛选值 | — |
| TodoList | — | filteredTodos |
| TodoItem | — | 单条 todo |
| TodoForm | 表单字段值、校验错误 | 编辑时读取目标 todo |
| ConfirmDialog | — | 通过 props 传入 |

## 3. 数据模型

```typescript
// types/todo.ts

type Priority = 'high' | 'medium' | 'low';

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;       // ISO 8601 (YYYY-MM-DD)
  priority: Priority;
  category: string;              // 自由输入，无预置列表
  completed: boolean;
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}

interface TodoFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: string;
}

interface FilterState {
  category: string;
  priority: Priority | '';
  status: 'all' | 'completed' | 'active';
  searchQuery: string;
}

interface Stats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;        // 0-100，保留 1 位小数
  categoryDistribution: Record<string, number>;
  priorityDistribution: Record<Priority, number>;
}
```

## 4. 状态管理设计 (Zustand)

### Store 结构

```typescript
interface TodoStore {
  // 数据
  todos: Todo[];

  // 筛选状态（持久化，保持筛选记忆）
  filter: FilterState;

  // 操作
  addTodo: (data: TodoFormData) => void;
  updateTodo: (id: string, data: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;

  // 筛选
  setFilter: (partial: Partial<FilterState>) => void;
  resetFilter: () => void;
}
```

**关键设计决策：**

- **派生数据不入 store。** `filteredTodos` 和 `stats` 在组件中用 `useMemo` / `useStore` selector 实时计算，保证一致性，避免冗余更新。
- **筛选状态存入 localStorage。** 用户刷新后保留上次筛选条件。
- **`addTodo` 内部生成 id 和时间戳。** 调用方只需传入表单数据。
- **不做 undo。** 删除操作有确认弹窗兜底。

### 持久化策略

使用 Zustand 的 `persist` 中间件：

```typescript
import { persist } from 'zustand/middleware';

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      // ...
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({
        todos: state.todos,
        filter: state.filter,
      }),
    }
  )
);
```

- **写策略：** 每次 todos/filter 变化立即写入 localStorage（同步，无异步延迟）。
- **读策略：** 应用初始化时中间件自动从 localStorage 恢复。
- **版本管理：** persist 中间件提供 version + migrate 字段，后续数据结构变更可写迁移函数。

## 5. 数据流

```
用户操作 → Store Action → set() 更新 Zustand state
                                  ↓
                         persist 中间件自动写入 localStorage
                                  ↓
                         组件 selector 收到新值 → 重渲染
```

**筛选流程：**

```
FilterBar 输入变化 → setFilter() → store.filter 更新
                                        ↓
                         TodoList 的 selector 依赖 filter
                         useMemo 重新计算 filteredTodos 返回组件
```

**统计流程：**

```
todos 变化 → StatsPanel 的 selector 收到新 todos
                ↓
         useMemo 计算 stats 对象
```

**筛选逻辑（纯函数 `utils/filter.ts`）：**

```typescript
function filterTodos(todos: Todo[], filter: FilterState): Todo[] {
  return todos
    .filter(t => filter.status === 'all' ||
      (filter.status === 'completed' ? t.completed : !t.completed))
    .filter(t => !filter.priority || t.priority === filter.priority)
    .filter(t => !filter.category || t.category === filter.category)
    .filter(t => !filter.searchQuery ||
      t.title.includes(filter.searchQuery) ||
      t.description.includes(filter.searchQuery));
}
```

## 6. 组件设计要点

### TodoForm — 添加/编辑复用

- 通过 `editingId: string | null` prop 区分模式。
- `editingId === null` → 添加模式，初始值为空表单。
- `editingId !== null` → 编辑模式，从 store 读取对应 todo 填充表单。
- 标题为必填项，提交前做空值校验，错误提示用表单内联文本。
- 表单关闭时机：保存成功或用户主动取消。

### TodoItem — 状态切换与操作

- 点击复选框 → `toggleTodo(id)`。
- 点击编辑按钮 → 设置 `editingId` 显示 TodoForm。
- 点击删除按钮 → 弹出 ConfirmDialog，确认后 `deleteTodo(id)`。
- 已完成项视觉淡化（低不透明度 + 删除线）。
- 过期判断：若 `dueDate < today && !completed` 显示过期警告。

### FilterBar — 受控组件

- 搜索框使用 `useState` 本地状态 + 300ms debounce 再写入 store，避免每次输入都触发筛选重算。
- 分类下拉选项动态收集：从 store 中 `todos` 提取去重后的分类列表。

### StatsPanel — 纯展示

- 用 selector 取 `todos`，`useMemo` 计算 stats。
- 分布统计用简单的柱状条或标签计数展示，不做图表库引入。

## 7. 边界情况

| 场景 | 处理方式 |
|---|---|
| 空列表 | 显示空状态插图/文案 + 引导"添加第一条待办" |
| 筛选无结果 | 显示"没有匹配的待办" + 重置筛选按钮 |
| 重复分类名 | 输入时不做去重约束，筛选下拉对同名自动合并 |
| 过期日期 | TodoItem 在到期日 < 今天且未完成时显示红色标记 |
| localStorage 满 | 捕获写入异常，console.warn 提示用户清理数据 |
| 极端长文字 | title 超出 200 字符截断，description 在卡片内折行 + 最大高度限制 |
| 分类为空 | 新建待办未填分类 = 空字符串，筛选下拉中归为"未分类" |

## 8. 性能考量

- 数据规模量级 < 1000 条时直接全量筛选，不做分页或虚拟列表。
- 筛选状态 debounce 300ms 再落 store，避免高频输入导致列表频繁重渲染。
- TodoItem 使用 `React.memo`，避免列表重渲染时未变更的项重新执行。
- 不做路由拆分，所有视图在同一页面通过筛选和条件渲染控制。
