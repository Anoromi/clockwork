"use client";

import { AppDialog } from "@/app/components/Dialog";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { useEffect } from "react";
import { useEditActivityMutation } from "../api";
import { selectEditActivity } from "../libraryStore";
import { ActivityForm } from "./activityForm";

type Props = {};

export default function LibraryEditActivityDialog({}: Props) {
  const state = useAppSelector((state) => state.library.activities.edit);

  const dispatch = useAppDispatch();

  const [editActivityMutation, editActivityResult] = useEditActivityMutation();

  useEffect(() => {
    if (editActivityResult.isSuccess) {
      editActivityResult.reset();
      dispatch(selectEditActivity(null));
    }
  }, [dispatch, editActivityResult]);

  return (
    <>
      <AppDialog
        open={state.selected !== null}
        onClose={() => dispatch(selectEditActivity(null))}
      >
        {state.selected !== null && (
          <ActivityForm
            initialValues={{
              name: state.selected.name,
              measurements: state!.selected.metrics,
            }}
            submitting={editActivityResult.isLoading}
            onSubmit={(formState) => {
              editActivityMutation({
                id: state.selected!.id!,
                name: formState.name,
                metrics: formState.measurements,
              });
            }}
            cancel={() => dispatch(selectEditActivity(null))}
            title={<AppDialog.Title>Add activity</AppDialog.Title>}
            inEdit={true}
          ></ActivityForm>
        )}
      </AppDialog>
    </>
  );
}
