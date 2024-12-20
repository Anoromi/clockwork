import styles from "@/app/[locale]/timer/component/actionButtons.module.scss";
import { IRecord } from "@/app/backend/database";
import CommonButton from "@/app/components/button/commonButton";
import RippleButton from "@/app/components/ripple-button";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { createRecord, pause, resume, start } from "../timerStore";

type Props = {
  openRecord: () => void;
};

export default function ActionButtons({ openRecord }: Props) {
  const state = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const stop = () => {
    const record: IRecord = {
      date: Date.now(),
      activityId: state.record!.activity.id!,
      records: state.record!.records,
    };
    dispatch(createRecord(record));
  };

  return (
    <>
      <div className={classNames(styles.mainActions)}>
        <RippleButton className={styles.recordButton} onClick={openRecord}>
          <Icon icon="mdi:record" fontSize={36} />
          Record
        </RippleButton>
        <div className={styles.secondaryActions}>
          {state.currentTimer !== null ? (
            <>
              <RippleButton
                className={styles.secondaryButton}
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
                className={styles.secondaryButton}
                key="stop"
                onClick={stop}
              >
                <Icon icon="material-symbols:stop" fontSize={24} />
                Stop
              </RippleButton>
            </>
          ) : (
            <>
              <CommonButton
                className={styles.start}
                onClick={() => {
                  dispatch(start());
                }}
                key="start"
              >
                <Icon icon="mingcute:play-fill" fontSize={42} />
              </CommonButton>
            </>
          )}
        </div>
      </div>
    </>
  );
}
