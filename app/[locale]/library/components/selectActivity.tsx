"use client";

import styles from "@/app/[locale]/library/components/selectActivity.module.scss";
import { IActivity } from "@/app/backend/database";
import RippleButton from "@/app/components/ripple-button";
import { useRipple } from "@/app/components/useRipple";
import { surfaceColoring } from "@/app/styles/coloring";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { useGetActivityQuery } from "../api";
import { selectActivity } from "../libraryStore";

export function LibrarySelectActivity() {
  const data = useGetActivityQuery();
  const selectedActivity = useAppSelector(
    (state) => state.library.records.selectedActivity,
  );
  const dispatch = useAppDispatch();

  const onActivityChange = (activity: IActivity | null) =>
    dispatch(selectActivity(activity));

  return (
    <>
      <span className={styles.listbox}>
        <Listbox value={selectedActivity} onChange={onActivityChange}>
          <ListboxButton className={styles.listboxButton} as={RippleButton}>
            {selectedActivity?.name ?? "Activity"}
            <Icon icon="octicon:chevron-down-12" fontSize={24} />
          </ListboxButton>

          <ListboxOptions className={styles.options}>
            <ActivityOption key={"Empty"} value={null}>
              None
            </ActivityOption>
            {data.isLoading ? (
              <></>
            ) : (
              data.data!.map((activity) => (
                <ActivityOption value={activity} key={activity.id}>
                  {activity.name}
                </ActivityOption>
              ))
            )}
          </ListboxOptions>
        </Listbox>
      </span>
    </>
  );
}

function ActivityOption({
  value,
  children,
}: React.PropsWithChildren<{ value: IActivity | null }>) {
  const { buttonData, rippleData } = useRipple({
    withElevation: false,
  });

  return (
    <ListboxOption
      value={value}
      {...buttonData}
      className={({ focus }) =>
        classNames(styles.option, surfaceColoring.surfaceNormal, {
          [surfaceColoring.surfaceElevated]: focus,
        })
      }
    >
      <div {...rippleData}></div>
      {children}
    </ListboxOption>
  );
}
