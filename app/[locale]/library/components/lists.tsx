"use client";

import styles from "@/app/[locale]/library/components/lists.module.scss";
import { useAppSelector } from "@/app/utils/clientUseRedux";
import { notUnd } from "@/app/utils/notNull";
import { useEffect } from "react";
import { useGetActivityQuery, useGetRecordsQuery } from "../api";
import ActivityItem from "./activityItem";
import RecordItem from "./recordItem";
import { LibrarySelectActivity } from "./selectActivity";

export function LibraryList() {
  const selectedActivity = useAppSelector(
    (state) => state.library.records.selectedActivity,
  );
  useEffect(() => {}, [selectedActivity]);
  const recordsQuery = useGetRecordsQuery(selectedActivity?.id ?? null);
  const activityQuery = useGetActivityQuery();

  return (
    <>
      <div className={styles.eventsContent}>
        <div className={styles.selectActivityWrapper}>
          <LibrarySelectActivity />
        </div>
        {recordsQuery.data === undefined || activityQuery.isLoading ? (
          <></>
        ) : (
          <>
            <div className={styles.itemList}>
              {recordsQuery.data.map((record) => (
                <RecordItem
                  record={record}
                  activity={notUnd(
                    activityQuery.data!.find(
                      (activity) => activity.id === record.activityId,
                    ),
                  )}
                  key={record.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function ActivityList() {
  const activityQuery = useGetActivityQuery();
  return (
    <>
      <div className={styles.eventsContent}>
        {activityQuery.isLoading ? (
          <></>
        ) : (
          <>
            {activityQuery.data!.map((activity) => (
              <ActivityItem activity={activity} key={activity.id} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
