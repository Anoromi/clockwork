type FinalValidator<T> = (value: T) => Promise<string | undefined>;

export function combinedValidators<T>(...validators: FinalValidator<T>[]) {
  return async (value: T) => {
    let error: string | undefined = undefined;
    for (const v of validators) {
      error ??= await v(value);
    }
    return error;
  };
}
