"use client"
import { IActivity, IRecord, Metric } from "@/app/backend/database";
import styles from "@/app/[locale]/library/components/recordItem.module.scss";
import { useFormatter } from "next-intl";
import { vollkorn } from "@/app/styles/fonts";
import classNames from "classnames";

type Props = {
  record: IRecord;
  activity: IActivity;
};

export default function RecordItem({ record, activity }: Props) {
  const format = useFormatter()
  const date = format.dateTime(record.date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  return (
    <>
      <div className={styles.card}>
        <div className={classNames(styles.date, vollkorn.className)}>
          {date}
        </div>
        <h3>{activity.name}</h3>
        <div className={styles.attemptList}>
          {record.records.map((value, i) => (
            <Attempt index={i} values={value} metrics={activity.metrics} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function Attempt({
  index,
  values,
  metrics,
}: {
  index: number;
  values: number[];
  metrics: Metric[];
}) {
  return (
    <>
      <div className={styles.attempt}>
        <div className={styles.attemptIndex}>{index + 1}</div>
        {values.map((value, index) => {
          //console.log(value, index)
          return (
            <div key={index}>
              {value} {metrics[index].metric}
            </div>
          );
        })}
      </div>
    </>
  );
}
