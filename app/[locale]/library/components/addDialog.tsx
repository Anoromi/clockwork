"use client";
import { AppDialog } from "@/app/components/Dialog";
import { useReactive } from "@/app/components/useReactive";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import styles from "@/app/[locale]/library/components/addDialog.module.scss";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch } from "react-redux";
import { changeAddDialog } from "../libraryStore";
import CommonButton from "@/app/components/button/commonButton";
import Flex from "@/app/components/layout/flex";
import { Icon } from "@iconify/react";
import RippleButton from "@/app/components/ripple-button";
import { Dispatch } from "@reduxjs/toolkit";
import { getDb } from "@/app/backend/database";
import { combinedValidators } from "@/app/utils/combinedValidator";
import { ActivityForm } from "./activityForm";
import { useAddActivityMutation } from "../api";
import { useEffect } from "react";

type Props = {};

export default function LibraryAddDialog({}: Props) {
  const openedAppDialog = useAppSelector(
    (state) => state.library.menuOptions.openedAddDialog
  );
  const dispatch = useAppDispatch();
  const [addActivityMutation, addActivityResult] = useAddActivityMutation();

  useEffect(() => {
    if (addActivityResult.isSuccess) dispatch(changeAddDialog(false));
  }, [addActivityResult, dispatch]);

  return (
    <>
      <AppDialog
        open={openedAppDialog}
        onClose={() => dispatch(changeAddDialog(false))}
      >
        <ActivityForm
          initialValues={{
            name: "",
            measurements: [
              {
                name: "count",
                metric: "",
              },
            ],
          }}
          submitting={addActivityResult.isLoading}
          onSubmit={(state) => {
            addActivityMutation({
              name: state.name,
              metrics: state.measurements,
            });
          }}
          cancel={() => dispatch(changeAddDialog(false))}
          title={
            <AppDialog.Title className={styles.title}>
              Add activity
            </AppDialog.Title>
          }
          inEdit={false}
        ></ActivityForm>
      </AppDialog>
    </>
  );
}
