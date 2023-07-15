"use client";

import React, { Suspense, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/app/[locale]/timer/styles.module.scss";
import RippleButton from "../../components/ripple-button";
import Inh from "./inh";
import { clockFont, rubik } from "../../styles/fonts";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Link from "next/link";
import evStyles from "@/app/[locale]/timer/current-event.module.scss";
import { AppDispatch, RootState, store } from "@/app/store";
import { increment, pause, resume, start, stopTimer } from "./timerStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Timer from "./component/timer";
import dayjs from "dayjs";
import SelectActivity from "./component/selectActivity";
import { useReactive } from "@/app/components/useReactive";
import { Dialog } from "@headlessui/react";
import AddRecordDialog from "./component/addRecordDialog";
import { Metric } from "@/app/backend/database";
import {useAppDispatch, useAppSelector} from "@/app/utils/clientUseRedux";


//const useAppDispatch: () => AppDispatch = useDispatch;
//const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




export default function TimerPage() {
  const t = useTranslations("Timer");
  const state = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  const openedRecord = useReactive(false);

  return (
    <>
      <main className={classNames(rubik.className, styles.main)}>
        <div className={classNames(styles.container)}>
          <div className={classNames(styles["top-bar"])}>
            <div className={classNames(styles.summary)}>
              <div>52 Overall</div>
              <div>
                {t("attempt", {
                  value: 3,
                })}
              </div>
              {/* <button onClick={() => dis(increment())}>{inc}</button> */}
            </div>

            <section className={styles["event-list"]}>
              {state.record?.records.map((record, i) => {
                return (
                  <CurrentEvent
                    index={i + 1}
                    key={i}
                    values={record}
                    metrics={state.record!.activity.metrics}
                  />
                );
              }) ?? <></>}
            </section>
          </div>
          <div className={styles["clock-wrapper"]}>
            {state.currentTimer !== null ? (
              <>
                <Timer
                  className={classNames(
                    styles["clock-current"],
                    clockFont.className
                  )}
                  initial={state.currentTimer?.currentRecordTimestamp}
                />
                <div className={styles["clock-overall"]}>12:00</div>
              </>
            ) : (
              <>
                <SelectActivity />
              </>
            )}
          </div>
          <div className={classNames(styles["main-actions"], styles.test)}>
            <RippleButton
              className={styles["record-button"]}
              onClick={() => openedRecord.set(true)}
            >
              <Icon icon="mdi:record" fontSize={36} />
              Record
            </RippleButton>
            <div className={styles["secondary-actions"]}>
              {state.currentTimer !== null ? (
                <>
                  <RippleButton
                    className={styles["secondary-button"]}
                    key="pause"
                    onClick={
                      state.currentTimer.currentRecordTimestamp.paused
                        ? () => dispatch(resume())
                        : () => dispatch(pause())
                    }
                  >
                    {state.currentTimer.currentRecordTimestamp.paused ? (
                      <>
                        <Icon
                          icon="material-symbols:resume"
                          fontSize={24}
                          onClick={() => dispatch(resume())}
                        />
                        Resume
                      </>
                    ) : (
                      <>
                        <Icon icon="material-symbols:pause" fontSize={24} />
                        Pause
                      </>
                    )}
                  </RippleButton>
                  <RippleButton
                    className={styles["secondary-button"]}
                    key="stop"
                    onClick={() => dispatch(stopTimer())}
                  >
                    <Icon icon="material-symbols:stop" fontSize={24} />
                    Stop
                  </RippleButton>
                </>
              ) : (
                <>
                  <RippleButton
                    className={styles.start}
                    // onClick={() => {
                    //   dispatch(start());
                    // }}
                    key="start"
                  >
                    <Icon icon="mingcute:play-fill" fontSize={30} />
                    Start
                  </RippleButton>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <AddRecordDialog
        opened={openedRecord.value}
        onClose={() => openedRecord.set(false)}
        metrics={state.record!.activity.metrics}
      />
    </>
  );
}

type CurrentEventsProps = {
  index: number;
  metrics: Metric[];
  values: number[];
};

function CurrentEvent({ index, metrics, values }: CurrentEventsProps) {
  return (
    <div className={classNames(styles.card)}>
      <h5 className={styles.index}>{index}</h5>
      <div className={styles.info}>
        {
            values.map((v, i) => 
            <>
              <div className={styles.infoText} key={i}>
                {v} <span>{metrics[i].metric}</span>
              </div>
            </>)
          }
      </div>
    </div>
  );
}


