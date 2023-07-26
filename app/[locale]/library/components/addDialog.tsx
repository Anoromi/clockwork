"use client";
import { AppDialog } from "@/app/components/Dialog";
import { useReactive } from "@/app/components/useReactive";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import styles from "@/app/[locale]/library/components/addDialog.module.scss";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch } from "react-redux";
import { addActivity, changeAddDialog } from "../libraryStore";
import arrayMutators from "final-form-arrays";
import CommonButton from "@/app/components/button/commonButton";
import Flex from "@/app/components/layout/flex";
import { Icon } from "@iconify/react";
import RippleButton from "@/app/components/ripple-button";
import { Dispatch } from "@reduxjs/toolkit";
import { getDb } from "@/app/backend/database";
import { combinedValidators } from "@/app/utils/combinedValidator";

type Props = {};

type AddActivityValues = {
  name: string;
  measurements: {
    name: string;
    metric: string;
  }[];
};

const unusedName = async (value: string) => {
  const db = await getDb();
  console.log(
    await db.activity.where("name").equalsIgnoreCase(value).toArray()
  );
  if ((await db.activity.where("name").equalsIgnoreCase(value).count()) !== 0)
    return "used/name";
};

export default function LibraryAddDialog({}: Props) {
  const openedAppDialog = useAppSelector(
    (state) => state.library.menuOptions.openedAddDialog
  );
  const addDialogData = useAppSelector(
    (state) => state.library.menuOptions.addDialog
  );
  const dispatch = useAppDispatch();

  //const form = useForm()

  return (
    <>
      <AppDialog
        open={openedAppDialog}
        onClose={() => dispatch(changeAddDialog(true))}
      >
        <Form
          initialValues={{
            name: "",
            measurements: [
              {
                name: "count",
                metric: "",
              },
            ],
          }}
          keepDirtyOnReinitialize
          onSubmit={(state: AddActivityValues) => {
            console.log(state);
            dispatch(
              addActivity({
                name: state.name,
                metrics: state.measurements,
              })
            );
          }}
          mutators={{ ...arrayMutators }}
        >
          {({
            values,
            handleSubmit,
            form: {
              mutators: { push, pop },
            },
          }) => (
            <form onSubmit={handleSubmit}>
              <fieldset disabled={addDialogData.submitting}>
                <Flex flexDirection="column" rowGap={"1rem"}>
                  <legend>
                    <AppDialog.Title className={styles.title}>
                      Add activity
                    </AppDialog.Title>
                  </legend>

                  <Field<string>
                    name="name"
                    validate={combinedValidators<string>(
                      async (v: string) =>
                        v === "" || v === undefined ? "empty" : undefined,
                      unusedName
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
                    {({ fields, meta }) => (
                      <Flex
                        flexDirection="column"
                        rowGap={"0.5rem"}
                        className={styles.measurementsContainer}
                      >
                        <Flex columnGap={"1rem"} paddingLeft={"1rem"}>
                          <span className={styles.measurementLabel}>
                            Measurement
                          </span>
                          <span className={styles.measurementLabel}>
                            Metric
                          </span>
                        </Flex>
                        {fields.map((name, index) => (
                          <Flex key={index} columnGap={"1rem"}>
                            <span className={styles.measurementIndex}>
                              {index + 1}
                            </span>
                            <Field name={`${name}.name`}>
                              {({ meta, input }) => (
                                <input
                                  {...input}
                                  type="text"
                                  className={styles.measurementField}
                                  disabled={index === 0}
                                />
                              )}
                            </Field>
                            <Field name={`${name}.metric`}>
                              {({ meta, input }) => (
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
                    <CommonButton
                      buttonType="text"
                      onClick={() => dispatch(changeAddDialog(false))}
                    >
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
      </AppDialog>
    </>
  );
}
