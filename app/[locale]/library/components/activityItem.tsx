"use client";
import styles from "@/app/[locale]/library/components/activityItem.module.scss";
import { IActivity } from "@/app/backend/database";
import CommonButton from "@/app/components/button/commonButton";
import { useAppDispatch } from "@/app/utils/clientUseRedux";
import { Icon } from "@iconify/react";
import { selectDeleteActivity, selectEditActivity } from "../libraryStore";

type Props = {
  activity: IActivity;
};

export default function ActivityItem({ activity }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={styles.card}>
        <div className={styles.title}>
          <h3>{activity.name}</h3>
          <div className={styles.cardActions}>
            <CommonButton
              buttonType="blank"
              textType="icon"
              onClick={() => dispatch(selectEditActivity(activity))}
            >
              <Icon icon="material-symbols:edit" fontSize={24} />
            </CommonButton>
            <CommonButton
              buttonType="blank"
              textType="icon"
              onClick={() => {
                dispatch(selectDeleteActivity(activity));
              }}
            >
              <Icon icon="ic:round-delete" fontSize={24} />
            </CommonButton>
          </div>
        </div>
        <div className={styles.metrics}>
          {activity.metrics.map((metric, index) => (
            <div key={index}>
              <div>{metric.name}</div>
              <div>{metric.metric}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
