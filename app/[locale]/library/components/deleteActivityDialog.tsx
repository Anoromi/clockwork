"use client";

import { AppDialog } from "@/app/components/Dialog";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useRef } from "react";
import styles from "@/app/[locale]/library/components/deleteActivityDialog.module.scss";
import CommonButton from "@/app/components/button/commonButton";
import Flex from "@/app/components/layout/flex";
import { useDeleteActivityMutation } from "../api";
import { selectDeleteActivity } from "../libraryStore";

type Props = {};

export default function DeleteAcivityDialog({}: Props) {
  const state = useAppSelector((state) => state.library.activities.delete);
  const dispatch = useAppDispatch();

  const [deleteActivityMutation, deleteActivityResult] =
    useDeleteActivityMutation();

  const opened = useMemo(() => state.selected !== null, [state.selected]);

  const onDelete = () => {
    deleteActivityMutation(state.selected!);
  };

  const onClose = () => dispatch(selectDeleteActivity(null));

  useEffect(() => {
    if (deleteActivityResult.isSuccess) {
      deleteActivityResult.reset();
      onClose();
    }
  });

  return (
    <>
      <AppDialog open={state.selected !== null} onClose={onClose}>
        {state.selected && (
          <>
            <AppDialog.Title>Delete {state.selected!.name}</AppDialog.Title>
            <Flex
              justifyContent={"end"}
              columnGap={"1rem"}
              paddingTop={"0.5rem"}
            >
              <CommonButton buttonType="text" onClick={onClose}>
                Cancel
              </CommonButton>
              <CommonButton onClick={onDelete}>Submit</CommonButton>
            </Flex>
          </>
        )}
      </AppDialog>
    </>
  );
}
