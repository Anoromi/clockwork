"use client";

import TimerPage from "../timer/page";
import styles from "@/app/[locale]/library/page.module.scss";
import { LibrarySelectActivity } from "./components/selectActivity";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import RecordItem from "./components/recordItem";
import { notNull, notUnd } from "@/app/utils/notNull";
import { useQuery } from "react-query";
import { getDb } from "@/app/backend/database";
import { useEffect } from "react";
import { record } from "../timer/timerStore";
import { setLibraryData } from "./libraryStore";
import ClientOnly from "@/app/components/ClientOnly";

export default function LibraryPage() {
  const state = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();
  console.log("running whee");

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Timer</h1>
            <div className={styles.optionBarWrapper}>
              <div className={styles.optionBar}></div>
            </div>
          </header>

          <div className={styles.eventsContent}>
            <div className={styles.selectActivityWrapper}>
              <LibrarySelectActivity />
            </div>
            <ClientOnly>
              <LibraryList />
            </ClientOnly>
          </div>
        </div>
      </main>
    </>
  );
}

function LibraryList() {
  const state = useAppSelector((state) => state.library);
  console.log(state);
  useLoadRecords();

  return (
    <>
      {state.loading ? (
        <></>
      ) : (
        <>
          {state.recordList!.map((record) => (
            <RecordItem
              record={record}
              activity={notUnd(
                state.activityMap!.find(
                  (activity) => activity.id === record.activityId
                )
              )}
              key={record.id}
            />
          ))}
        </>
      )}
    </>
  );
}

function useLoadRecords() {
  const dispatch = useAppDispatch();

  const recordQuery = useQuery("records", async () =>
    (await getDb()).record.toArray()
  );
  const activityQuery = useQuery("activities", async () =>
    (await getDb()).activity.toArray()
  );

  useEffect(() => {
    if (recordQuery.data !== undefined && activityQuery.data !== undefined)
      dispatch(
        setLibraryData({
          activities: activityQuery.data,
          records: recordQuery.data,
        })
      );
  }, [recordQuery.data, activityQuery.data]);
}
