"use client";

import { useReactive } from "@/app/components/useReactive";
import { notUnd } from "@/app/utils/notNull";
import {
  useAddActivityMutation,
  useGetActivityQuery,
  useGetRecordsQuery,
  useListRecordsQuery,
} from "../api";
import ActivityItem from "./activityItem";
import RecordItem from "./recordItem";
import styles from "@/app/[locale]/library/components/lists.module.scss";
import { useEffect, useRef, useState } from "react";
import { LibrarySelectActivity } from "./selectActivity";
import { useAppSelector } from "@/app/utils/clientUseRedux";

export function LibraryList() {
  const selectedActivity = useAppSelector((state) => state.library.records.selectedActivity)
  useEffect(() => {
    console.log('selected', selectedActivity)
  }, [selectedActivity])
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
                      (activity) => activity.id === record.activityId
                    )
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


//export function LibraryList() {
//  //const state = useAppSelector((state) => state.library.records);
//  //console.log(state);
//  //useLoadRecords();
//
//  const [page, setPage] = useState(0);
//  const recordsQuery = useListRecordsQuery(page);
//  const activityQuery = useGetActivityQuery();
//
//  const pageDiv = useRef<HTMLDivElement | null>(null);
//
//  useEffect(() => {
//    const div = pageDiv.current;
//    if (div === null) return;
//
//    const scrolledToBottom =
//      div.scrollTop + div.clientHeight >= div.scrollHeight;
//    if (
//      scrolledToBottom &&
//      !recordsQuery.isLoading &&
//      !recordsQuery.data!.reachedEnd
//    )
//      setPage(recordsQuery.data!.lastPage + 1);
//
//    const onScroll = () => {
//      const scrolledToBottom =
//        div.scrollTop + div.clientHeight >= div.scrollHeight;
//      if (
//        scrolledToBottom &&
//        !recordsQuery.isLoading &&
//        !recordsQuery.data!.reachedEnd
//      )
//        setPage(recordsQuery.data!.lastPage + 1);
//    };
//
//    div.addEventListener("scroll", onScroll);
//    return () => {
//      div.removeEventListener("scroll", onScroll);
//    };
//  }, [page, recordsQuery.data?.lastPage, recordsQuery.isLoading]);
//
//  return (
//    <>
//      <div className={styles.eventsContent} ref={pageDiv}>
//        <div className={styles.selectActivityWrapper}>
//          <LibrarySelectActivity />
//        </div>
//        {recordsQuery.data === undefined || activityQuery.isLoading ? (
//          <></>
//        ) : (
//          <>
//            <div className={styles.itemList}>
//              {recordsQuery.data.list.map((record) => (
//                <RecordItem
//                  record={record}
//                  activity={notUnd(
//                    activityQuery.data!.find(
//                      (activity) => activity.id === record.activityId
//                    )
//                  )}
//                  key={record.id}
//                />
//              ))}
//            </div>
//          </>
//        )}
//      </div>
//    </>
//  );
//}

export function ActivityList() {
  //const state = useAppSelector((state) => state.library.activities);
  //useLoadActivities();

  const activityQuery = useGetActivityQuery();
  const [updateHehe, result] = useAddActivityMutation();
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

//function useLoadRecords() {
//  const dirtyRecords = useAppSelector((state) => state.library.records.dirty);
//  const dispatch = useAppDispatch();
//
//  const recordQuery = useQuery("records", async () => {
//    console.log("querying records", (await getDb()).record.toArray());
//    return (await getDb()).record.toArray();
//  });
//  const activityQuery = useQuery("activities", async () =>
//    (await getDb()).activity.toArray()
//  );
//  const queryClient = useQueryClient();
//
//  useEffect(() => {
//    if (recordQuery.data !== undefined && activityQuery.data !== undefined)
//      dispatch(
//        setRecordsData({
//          activities: activityQuery.data,
//          records: recordQuery.data,
//        })
//      );
//
//    if (dirtyRecords) {
//      //recordQuery.refetch();
//      //activityQuery.refetch();
//      dispatch(changeRecordsToLoading());
//      queryClient.invalidateQueries("activities");
//      queryClient.invalidateQueries("records");
//    }
//  }, [
//    recordQuery.data,
//    activityQuery.data,
//    dispatch,
//    dirtyRecords,
//    recordQuery,
//    activityQuery,
//  ]);
//}

//function useLoadActivities() {
//  const dirtyActivity = useAppSelector(
//    (state) => state.library.activities.dirty
//  );
//  const dispatch = useAppDispatch();
//  const queryClient = useQueryClient();
//
//  const activityQuery = useQuery("activities", async () =>
//    (await getDb()).activity.toArray()
//  );
//
//  useEffect(() => {
//    if (activityQuery.data !== undefined)
//      dispatch(
//        setActivityData({
//          activities: activityQuery.data,
//        })
//      );
//
//    if (dirtyActivity) {
//      dispatch(changeRecordsToLoading());
//      //activityQuery.refetch();
//      queryClient.invalidateQueries("activities");
//    }
//  }, [activityQuery, activityQuery.data, dirtyActivity, dispatch, queryClient]);
//}
