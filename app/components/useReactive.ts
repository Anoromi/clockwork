import { Dispatch, SetStateAction, useState } from "react";

export type Modal<T> = {
  readonly value: T;
  set: Dispatch<SetStateAction<T>>;
};

export function useReactive<T>(initial: T): Modal<T> {
  let [value, setValue] = useState(initial);
  return {
    value,
    set: setValue,
  };
}
