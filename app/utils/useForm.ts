import { useMemo } from "react";
import { useReactive } from "../components/useReactive";

export type Validator<T> = (value: T) => Record<string, unknown> | null;

export type FormInput<T> = {
  initialValue: T;
  validators: Validator<T>[];
};

export type InputControl<T> = {
  value: T;
  errors: Record<string, unknown> | null;
  checked: boolean;
};

export type InputControls<T extends Record<string, FormInput<any>>> = {
  [Item in keyof T]: InputControl<
    T[Item] extends FormInput<infer Value> ? Value : never
  >;
};

type FormControl<T extends Record<string, FormInput<any>>> = {
  inputs: InputControls<T>;
  change: <G extends keyof T>(name: G, value: T[G]["initialValue"]) => void;
  isValid: boolean;
  onSubmit: (values: React.FormEvent) => void;
  //change:
};

type Genny = FormControl<{
  hello: {
    initialValue: 2;
    validators: [];
  };
}>;

//
//function pan<T extends FormControl<{}>>(form: T) {
//  return form
//}
//
//pan({
//  hen: {
//
//  }
//})
export function useForm<T extends Record<string, FormInput<any>>>({
  params,
  onSubmit,
}: {
  params: T;
  onSubmit: (formData: InputControls<T>) => void;
}): FormControl<T> {
  const initialInputs: Record<
    string,
    {
      checked: boolean;
      value: unknown;
      errors: Record<string, unknown> | null;
    }
  > = {};
  for (const next of Object.keys(params)) {
    let g = params[next];
    initialInputs[next] = {
      checked: false,
      value: g.initialValue,
      errors: null,
    };

  }

  const state = useReactive({
    inputs: initialInputs as InputControls<T>,
  });

  function set<S extends keyof T>(field: S, value: T[S]["initialValue"]) {
    const input = params[field];

    state.set({
      ...state.value,
      inputs: {
        ...state.value.inputs,
        [field]: {
          checked: true,
          value,
          errors: checkValidators(params[field].validators, value),
        },
      },
    });
  }

  const correctForm = useMemo(() => {
    for (const field of Object.entries(state.value.inputs)) {
      if (field[1].errors === null) return true;
    }
    return false;
  }, [state.value]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("submitting");

    const values: Record<string, InputControl<unknown>> = {};
    let anyErrors = false;

    for (const inputName of Object.keys(state.value.inputs)) {
      let input = state.value.inputs[inputName];
      const errors = checkValidators(params[inputName].validators, input.value);
      console.log(
        "cheking errors",
        inputName,
        input,
        errors,
        params[inputName].validators
      );

      if (errors !== null) {
        anyErrors = true;
      }

      values[inputName] = {
        checked: true,
        errors: errors,
        value: input.value,
      };
    }

    if (anyErrors) {
      state.set({ inputs: values as InputControls<T> });
      return;
    }

    console.log("successfully submitted");
    onSubmit(state.value.inputs);
  }

  return {
    inputs: state.value.inputs as any,
    change: set,
    isValid: correctForm,
    onSubmit: submit,
  };
}

function checkValidators<T>(validators: Validator<T>[], value: T) {
  let errors: Record<string, unknown> = {};
  for (const validator of validators) {
    console.log("checking", errors);
    errors = {
      ...errors,
      ...(validator(value) ?? {}),
    };
  }
  console.log("checking", errors);

  if (Object.keys(errors).length === 0) {
    return null;
  }
  return errors;
}

export function createInputForm<T>(inputForm: FormInput<T>) {
  return inputForm;
}

//const result = useForm({
//  params: {
//    hehe: createInputForm<number>({
//      initialValue: 23,
//      validators: [],
//    }),
//  },
//  onSubmit: () => {},
//});

//const aha : InputForm<number> = {
//  initialValue: 3,
//
//}

//type T = typeof useForm<{
//  hehe: {
//    initialValue: string
//  }
//}>
//

type R = {
  genny: string;
  penny: number;
};

type G = {
  [Property in keyof R]: boolean;
};

function set<S extends keyof R>(field: S, value: R[S]) {
  return value;
}

// set('penny', )
