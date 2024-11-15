"use client";

import styles from "@/app/[locale]/timer/component/topBar.module.scss";
import { Metric } from "@/app/backend/database";
import Flex from "@/app/components/layout/flex";
import { useAppSelector } from "@/app/utils/clientUseRedux";
import classNames from "classnames";
import { useTranslations } from "next-intl";

type Props = {};

export default function TimerInfo({}: Props) {
  const translate = useTranslations("Timer");
  const state = useAppSelector((state) => state.timer.record);

  return (
    <>
      <Flex className={classNames(styles.topBar)} flexDirection="column">
        <div className={classNames(styles.summary)}>
          <div>
            {translate("overall", {
              value:
                state?.records
                  .map((v) => v[0])
                  .reduce((left, right) => left + right, 0) ?? 0,
            })}
          </div>
          <div>
            {translate("attempts", {
              value: (state?.records.length ?? 0) + 1,
            })}
          </div>
        </div>

        <section className={styles.eventList}>
          {state?.records.map((record, i) => {
            return (
              <CurrentEvent
                index={i + 1}
                key={i}
                values={record}
                metrics={state.activity.metrics}
              />
            );
          }) ?? <></>}
        </section>
      </Flex>
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
        {values.map((v, i) => (
          <>
            <div className={styles.infoText} key={i}>
              {v} <span>{metrics[i].metric}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
