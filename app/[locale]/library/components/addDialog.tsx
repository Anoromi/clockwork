"use client";
import styles from "@/app/[locale]/library/components/addDialog.module.scss";
import { AppDialog } from "@/app/components/Dialog";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { useEffect } from "react";
import { useAddActivityMutation } from "../api";
import { changeAddDialog } from "../libraryStore";
import { ActivityForm } from "./activityForm";

type Props = {};

export default function LibraryAddDialog({}: Props) {
  const openedAppDialog = useAppSelector(
    (state) => state.library.menuOptions.openedAddDialog,
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
