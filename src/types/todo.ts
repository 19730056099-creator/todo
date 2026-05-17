export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
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

export interface TodoFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: string;
}

export interface FilterState {
  category: string;
  priority: Priority | '';
  status: 'all' | 'completed' | 'active';
  searchQuery: string;
}

export interface Stats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;        // 0-100，保留 1 位小数
  categoryDistribution: Record<string, number>;
  priorityDistribution: Record<Priority, number>;
}

export const DEFAULT_FILTER: FilterState = {
  category: '',
  priority: '',
  status: 'all',
  searchQuery: '',
};
