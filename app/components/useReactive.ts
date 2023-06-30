import { Dispatch, SetStateAction, useState } from "react"

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

export function useReactive<T>(initial: T) {
	let [value, setValue] = useState(initial)
	return {
		value,
		set: setValue,
	}
}
