const STORAGE_PREFIX = 'todo-app-';

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[storage] 读取 "${key}" 失败，数据可能已损坏`);
    return null;
  }
}

export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    console.warn('[storage] 写入失败，localStorage 可能已满或不可用');
    return false;
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // 移除操作失败无需处理
  }
}

export function clear(): void {
  try {
    const keys = Object.keys(localStorage).filter(k =>
      k.startsWith(STORAGE_PREFIX),
    );
    keys.forEach(k => localStorage.removeItem(k));
  } catch {
    console.warn('[storage] 清理失败');
  }
}

export function getUsedSize(): number {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value) total += key.length + value.length;
    }
  }
  return total;
}
