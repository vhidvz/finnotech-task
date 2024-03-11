export function toString<T = any>(val: T): string {
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

export function toJSON<T = any>(val: string): T {
  try {
    return JSON.parse(val);
  } catch {
    return val as T;
  }
}
