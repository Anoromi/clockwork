import styles from "@/app/[locale]/library/components/activityForm.module.scss";
import { getDb } from "@/app/backend/database";
import CommonButton from "@/app/components/button/commonButton";
import Flex from "@/app/components/layout/flex";
import { combinedValidators } from "@/app/utils/combinedValidator";
import { Icon } from "@iconify/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

type FormActivityValues = {
  name: string;
  measurements: {
    name: string;
    metric: string;
  }[];
};

const unusedName = async (value: string) => {
  const db = await getDb();
  if ((await db.activity.where("name").equalsIgnoreCase(value).count()) !== 0)
    return "used/name";
};

const unusedEditName = (originalName: string) => async (value: string) => {
  const db = await getDb();
  if (
    (await db.activity
      .where("name")
      .equalsIgnoreCase(value)
      .filter((v) => v.name !== originalName)
      .count()) !== 0
  )
    return "used/name";
};

export function ActivityForm({
  title,
  submitting,
  onSubmit,
  cancel,
  initialValues,
  inEdit,
}: {
  title: React.ReactElement;
  submitting: boolean;
  onSubmit: (state: FormActivityValues) => void;
  cancel: () => void;
  initialValues: FormActivityValues;
  inEdit: boolean;
}) {
  return (
    <Form
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={(state: FormActivityValues) => {
        onSubmit(state);
      }}
      mutators={{ ...arrayMutators }}
    >
      {({
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <fieldset disabled={submitting}>
            <Flex flexDirection="column" rowGap={"1rem"}>
              <legend>{title}</legend>

              <Field<string>
                name="name"
                validate={combinedValidators<string>(
                  async (v: string) =>
                    v === "" || v === undefined ? "empty" : undefined,
                  inEdit ? unusedEditName(initialValues.name) : unusedName,
                )}
              >
                {({ meta, input }) => (
                  <>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="name" className={styles.inputLabel}>
                        Name
                        {meta.error && meta.touched && (
                          <span className={styles.inputError}>
                            {meta.error}
                          </span>
                        )}
                      </label>
                      <input
                        {...input}
                        type="text"
                        className={styles.inputField}
                      />
                    </div>
                  </>
                )}
              </Field>

              <FieldArray name="measurements">
                {({ fields }) => (
                  <Flex<"fieldset">
                    flexDirection="column"
                    rowGap={"0.5rem"}
                    className={styles.measurementsContainer}
                    as="fieldset"
                    innerParams={{
                      disabled: inEdit,
                    }}
                  >
                    <Flex columnGap={"1rem"} paddingLeft={"1rem"}>
                      <span className={styles.measurementLabel}>
                        Measurement
                      </span>
                      <span className={styles.measurementLabel}>Metric</span>
                    </Flex>
                    {fields.map((name, index) => (
                      <Flex key={index} columnGap={"1rem"}>
                        <span className={styles.measurementIndex}>
                          {index + 1}
                        </span>
                        <Field name={`${name}.name`}>
                          {({  input }) => (
                            <input
                              {...input}
                              type="text"
                              className={styles.measurementField}
                              disabled={index === 0}
                            />
                          )}
                        </Field>
                        <Field name={`${name}.metric`}>
                          {({ input }) => (
                            <input
                              {...input}
                              type="text"
                              className={styles.measurementField}
                              disabled={index === 0}
                            />
                          )}
                        </Field>
                        <CommonButton
                          className={styles.measurementDelete}
                          buttonType="text"
                          textType="icon"
                          disabled={index === 0}
                          onClick={() => fields.remove(index)}
                        >
                          <Icon icon="ic:round-delete" fontSize={24} />
                        </CommonButton>
                      </Flex>
                    ))}

                    <Flex>
                      <CommonButton
                        buttonType="outlined"
                        className={styles.measurementAction}
                        type="button"
                        onClick={() => fields.push(undefined)}
                        disabled={inEdit}
                      >
                        Add metric
                      </CommonButton>
                    </Flex>
                  </Flex>
                )}
              </FieldArray>
              <Flex
                className={styles.actions}
                justifyContent="end"
                paddingTop={"0.25rem"}
                columnGap={"1rem"}
              >
                <CommonButton buttonType="text" onClick={cancel}>
                  Cancel
                </CommonButton>
                <CommonButton buttonType="primary" type="submit">
                  Submit
                </CommonButton>
              </Flex>
            </Flex>
          </fieldset>
        </form>
      )}
    </Form>
  );
}
