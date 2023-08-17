export function notNull<T>(value: T | null): T {
  if (value === null) throw new Error("Value is null");
  return value;
}

export function notUnd<T>(value: T | undefined): T {
  if (value === undefined) throw new Error("Value is undefined");
  return value;
}
