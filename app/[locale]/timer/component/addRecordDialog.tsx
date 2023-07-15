"use client";

import { Dialog } from "@headlessui/react";
import styles from "@/app/[locale]/timer/component/addRecordDialog.module.scss";
import { Fragment, HTMLInputTypeAttribute, useMemo } from "react";
import { Modal, useReactive } from "@/app/components/useReactive";
import textField from "@/app/[locale]/timer/component/textField.module.scss";
import classNames from "classnames";
import RippleButton from "@/app/components/ripple-button";
import { rubik } from "@/app/styles/fonts";
import {
  createInputForm,
  FormInput,
  InputControl,
  useForm,
} from "@/app/utils/useForm";

import { Validators } from "@/app/utils/simpleValidators";
import { useAppDispatch } from "@/app/utils/clientUseRedux";
import {record} from "../timerStore";

type Props = {
  opened: boolean;
  onClose: () => void;
  metrics: { name: string; metric: string }[];
};

export default function AddRecordDialog({ opened, onClose, metrics }: Props) {
  const dispatch = useAppDispatch();

  const formInputs = useMemo(() => {
    return metrics.reduce((previous, next) => {
      return {
        ...previous,
        [next.name]: createInputForm<string>({
          initialValue: "",
          validators: [Validators.required, Validators.isNumber],
        }),
      };
    }, {} as Record<string, FormInput<string>>);
  }, [metrics]);

  const form = useForm({
    params: formInputs,
    onSubmit: (values) => {
      const resultingStats = metrics.map((metric) =>
        parseFloat(values[metric.name].value)
      );
      dispatch(record(resultingStats))
      onClose()
    },
  });

  return (
    <>
      <Dialog open={opened} onClose={onClose}>
        <div className={styles.dialogWrapper}>
          <Dialog.Panel className={styles.dialog}>
            <div className={styles.dialogBackground}></div>
            <div className={styles.dialogContent}>
              <form onSubmit={form.onSubmit}>
                <fieldset>
                  <legend>
                    <Dialog.Title className={styles.title}>Record</Dialog.Title>
                  </legend>

                  {metrics.map(({ name, metric }) => (
                    <TextField
                      text={form.inputs[name].value.toString()}
                      errors={form.inputs[name].errors}
                      updateText={(value) => form.change(name, value)}
                      name={name}
                      label={name}
                      metric={metric}
                      key={name}
                      // checkError={(text) => }
                    />
                  ))}

                  <div className={classNames(styles.buttonRow)}>
                    <RippleButton
                      className={classNames(styles.button, styles.cancel)}
                      onClick={onClose}
                    >
                      Cancel
                    </RippleButton>
                    <RippleButton
                      className={classNames(styles.button, styles.submit)}
                      type="submit"
                    >
                      Submit
                    </RippleButton>
                  </div>
                </fieldset>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

type TextFieldProps = {
  //text: Modal<string>;
  text: string;
  errors: Record<string, unknown> | null;
  updateText: (text: string) => void;
  name: string;
  label: string;
  metric: string;
  type?: HTMLInputTypeAttribute;
  checkError?: (key: string, value: unknown) => string | null;
};

function TextField({
  name,
  text,
  label,
  updateText,
  metric,
  type = "number",
}: TextFieldProps) {
  return (
    <>
      <label className={textField.label}>
        <span className={textField.labelText}>{label}</span>
        <div className={textField.inputRow}>
          <input
            type={type}
            name={name}
            id={name}
            className={textField.input}
            onInput={(e) => updateText(e.currentTarget.value)}
            value={text}
          />
          <span className={textField.inputMetric}>{metric}</span>
        </div>
      </label>
    </>
  );
}
