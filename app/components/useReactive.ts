import { Dispatch, SetStateAction, useState } from "react";

// export class Reactive<T> {
// 	_value: T
// 	_dispatch: Dispatch<SetStateAction<T>>

// 	constructor(value: T, dispatch: Dispatch<SetStateAction<T>>) {
// 		this._value = value
// 		this._dispatch = dispatch
// 	}

// 	getValue(): T {
// 		return this._value
// 	}

//   setValue(value: T) {
//     this._dispatch(value)
//   }
// }
//

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
