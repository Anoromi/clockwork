"use client";
import styles from "@/app/[locale]/timer/page.module.scss";
import CommonButton from "@/app/components/button/commonButton";
import Flex from "@/app/components/layout/flex";
import Title from "@/app/components/text/title";
import { switchTheme } from "@/app/extrasStore";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { clockFont, rubik } from "../../styles/fonts";
import ActionButtons from "./component/actionButtons";
import SelectActivity from "./component/selectActivity";
import Timer from "./component/timer";
import TimerInfo from "./component/topBar";
import { setOpenedRecord } from "./timerStore";

export default function TimerPage() {
  const dispatch = useAppDispatch();

  return (
    <>
      <main className={classNames(rubik.className, styles.main)}>
        <Flex<"header">
          as="header"
          justifyContent={"space-between"}
          alignItems={"center"}
          className={styles.header}
          paddingLeft={"1rem"}
          paddingRight={"1rem"}
        >
          <Title href="/">Timer</Title>
          <CommonButton
            buttonType="blank"
            textType="icon"
            onClick={() => dispatch(switchTheme())}
          >
            <Icon icon="mdi:color" fontSize={"24px"} />
          </CommonButton>
        </Flex>

        <div className={classNames(styles.container)}>
          <TimerInfo />
          <CurrentTimer />
          <ActionButtons openRecord={() => dispatch(setOpenedRecord(true))} />
        </div>
      </main>

      <DynamicDialog />
    </>
  );
}

const DynamicDialog = dynamic(() => import("./component/addRecordDialog"), {
  ssr: false,
});

function CurrentTimer() {
  const state = useAppSelector((state) => state.timer.currentTimer);

  return (
    <>
      <div className={styles.clockWrapper}>
        {state !== null ? (
          <>
            <Timer
              className={classNames(styles.clockCurrent, clockFont.className)}
              initial={state?.currentRecordTimestamp}
            />
            {
              // <div className={styles["clock-overall"]}>12:00</div>
            }
          </>
        ) : (
          <>
            <SelectActivity />
          </>
        )}
      </div>
    </>
  );
}
