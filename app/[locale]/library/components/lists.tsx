"use client";

import { getDb } from "@/app/backend/database";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import { notUnd } from "@/app/utils/notNull";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import {useAddActivityMutation, useGetActivityQuery, useGetRecordsQuery} from "../api";
import ActivityItem from "./activityItem";
import RecordItem from "./recordItem";

export function LibraryList() {
  //const state = useAppSelector((state) => state.library.records);
  //console.log(state);
  //useLoadRecords();

  const recordsQuery = useGetRecordsQuery() 
  const activityQuery = useGetActivityQuery() 

  return (
    <>
      {recordsQuery.isLoading || activityQuery.isLoading ? (
        <></>
      ) : (
        <>
          {recordsQuery.data!.map((record) => (
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
        </>
      )}
    </>
  );
}

export function ActivityList() {
  //const state = useAppSelector((state) => state.library.activities);
  //useLoadActivities();
  
  const activityQuery = useGetActivityQuery()
  const [updateHehe, result] = useAddActivityMutation()
  return (
    <>
      {activityQuery.isLoading ? (
        <></>
      ) : (
        <>
          {activityQuery.data!.map((activity) => (
            <ActivityItem activity={activity} key={activity.id} />
          ))}
        </>
      )}
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
