"use client";

import styles from "@/app/[locale]/timer/component/selectActivity.module.scss";
import { IActivity } from "@/app/backend/database";
import RippleButton from "@/app/components/ripple-button";
import { useRipple } from "@/app/components/useRipple";
import { surfaceColoring } from "@/app/styles/coloring";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { Fragment } from "react";
import { useGetActivityQuery } from "../../library/api";
import { selectActivity } from "../timerStore";

type Props = {};

export default function SelectActivity({}: Props) {
  const selectedActivity = useAppSelector(
    (state) => state.timer.selectedActivity,
  );
  const dispatch = useAppDispatch();

  const data = useGetActivityQuery();

  return (
    <>
      {data.isLoading ? (
        <></>
      ) : (
        <>
          <span className={classNames(styles.listbox)}>
            <Listbox
              value={null as null | IActivity}
              onChange={(value) => dispatch(selectActivity(value))}
            >
              <ListboxButton
                as={RippleButton}
                className={({ open }) =>
                  classNames(styles.button, {
                    [styles.buttonSelected]: open,
                  })
                }
              >
                <>
                  {selectedActivity?.name ?? "Select activity"}
                  <Icon icon="material-symbols:expand-more" fontSize={30} />
                </>
              </ListboxButton>
              <Transition
                as={Fragment}
                leave={styles["opacity-leave"]}
                enter={styles["opacity-enter"]}
                enterTo={styles["opacity-enter-to"]}
                enterFrom={styles["opacity-enter-from"]}
                leaveTo={styles["opacity-leave-to"]}
                leaveFrom={styles["opacity-leave-from"]}
              >
                <ListboxOptions
                  className={classNames(styles.options)}
                  hidden={false}
                >
                  {data.data!.map((activity) => (
                    <ActivityOption data={activity} key={activity.name} />
                  ))}
                </ListboxOptions>
              </Transition>
            </Listbox>
          </span>
        </>
      )}
    </>
  );
}

function ActivityOption({ data }: { data: IActivity }) {
  const { rippleData, buttonData } = useRipple({
    withElevation: false,
  });
  return (
    <Listbox.Option
      value={data}
      {...buttonData}
      className={({ active }) =>
        classNames(
          buttonData.className,
          styles.option,
          surfaceColoring.surfaceNormal,
          {
            [surfaceColoring.surfaceElevated]: active,
          },
        )
      }
    >
      {() => (
        <>
          <div {...rippleData}></div>
          {data.name}
        </>
      )}
    </Listbox.Option>
  );
}
