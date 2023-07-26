import { IActivity } from "@/app/backend/database";
import RippleButton from "@/app/components/ripple-button";
import styles from "@/app/[locale]/library/components/activityItem.module.scss";
import { Icon } from "@iconify/react";
import classNames from "classnames";

type Props = {
  activity: IActivity;
};

export default function ActivityItem({ activity }: Props) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.title}>
          <h3>{activity.name}</h3>
          <div className={styles.cardActions}>
            <RippleButton className={classNames(styles.cardAction)}>
              <Icon icon="material-symbols:edit" fontSize={24} />
            </RippleButton>
            <RippleButton className={classNames(styles.cardAction)}>
              <Icon icon="ic:round-delete" fontSize={24} />
            </RippleButton>
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
