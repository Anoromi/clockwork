"use client";

import styles from "@/app/[locale]/timer/component/addRecordDialog.module.scss";
import textField from "@/app/[locale]/timer/component/textField.module.scss";
import { createInputForm, FormInput, useForm } from "@/app/utils/useForm";
import classNames from "classnames";
import { HTMLInputTypeAttribute, useMemo } from "react";

import CommonButton from "@/app/components/button/commonButton";
import { AppDialog } from "@/app/components/Dialog";
import Flex from "@/app/components/layout/flex";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { Validators } from "@/app/utils/simpleValidators";
import { record, setOpenedRecord } from "../timerStore";

type Props = {};

export default function AddRecordDialog({}: Props) {
  const state = useAppSelector((state) => state.timer.record);
  return <>{state !== null && <DialogImpl />}</>;
}

function DialogImpl() {
  const state = useAppSelector((state) => state.timer.record);
  const dispatch = useAppDispatch();

  const metrics = state!.activity.metrics;

  const formInputs = useMemo(() => {
    return metrics.reduce(
      (previous, next) => {
        return {
          ...previous,
          [next.name]: createInputForm<string>({
            initialValue: "",
            validators: [Validators.required, Validators.isNumber],
          }),
        };
      },
      {} as Record<string, FormInput<string>>,
    );
  }, [metrics]);

  const opened = useAppSelector((state) => state.timer.openedRecord);

  const onClose = () => dispatch(setOpenedRecord(false));

  const form = useForm({
    params: formInputs,
    onSubmit: (values) => {
      const resultingStats = metrics.map((metric) =>
        parseFloat(values[metric.name].value),
      );
      dispatch(record(resultingStats));
      onClose();
    },
  });

  return (
    <>
      <AppDialog open={opened} onClose={onClose}>
        <form onSubmit={form.onSubmit}>
          <fieldset>
            <legend>
              <AppDialog.Title className={styles.title}>Record</AppDialog.Title>
            </legend>

            <Flex flexDirection="column" rowGap={"1rem"}>
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
            </Flex>

            <div className={classNames(styles.buttonRow)}>
              <CommonButton onClick={onClose} buttonType="text">
                Cancel
              </CommonButton>
              <CommonButton
                onClick={onClose}
                type="submit"
                buttonType="primary"
              >
                Submit
              </CommonButton>
            </div>
          </fieldset>
        </form>
      </AppDialog>
    </>
  );
}

type TextFieldProps = {
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
