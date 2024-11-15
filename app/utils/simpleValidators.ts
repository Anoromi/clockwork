import { Validator } from "./useForm";

export namespace Validators {
  export function above(floor: number): Validator<number> {
    return (value) => {
      if (value <= floor) return { above: undefined };

      return null;
    };
  }

  export const required: Validator<unknown> = (value) => {
    if (value === null || value === undefined) return { required: undefined };
    return null;
  };

  export const properNumber: Validator<number> = (value) => {
    if (
      isNaN(value) ||
      value === Number.POSITIVE_INFINITY ||
      value === Number.NEGATIVE_INFINITY
    ) {
      return { valid: undefined };
    }
    return null;
  };

  export const isNumber: Validator<string> = (value) => {
    if (isNaN(parseFloat(value))) return { number: undefined };
    return null;
  };
}
