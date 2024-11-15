import { getDb, IActivity, IRecord } from "@/app/backend/database";
import { createApi } from "@reduxjs/toolkit/query/react";

type Query =
  | {
      type: "get";
    }
  | {
      type: "add";
      value: IActivity;
    }
  | {
      type: "update";
      value: IActivity;
    }
  | {
      type: "delete";
      value: IActivity;
    };

export const activityApi = createApi({
  reducerPath: "activityApi",
  tagTypes: ["Activity", "Record"],
  baseQuery: (_query: Query) => {
    return { data: undefined };
  },
  endpoints(builder) {
    return {
      getActivity: builder.query<IActivity[], void>({
        async queryFn() {
          return {
            data: await (await getDb()).activity.toArray(),
          };
        },
        providesTags: ["Activity"],
      }),
      getRecords: builder.query<IRecord[], number | null>({
        async queryFn(arg) {
          if (arg === null)
            return {
              data: await (await getDb()).record.reverse().sortBy("id"),
            };
          return {
            data: await (await getDb()).record
              .where("activityId")
              .equals(arg)
              .reverse()
              .sortBy("id"),
          };
        },
        providesTags: ["Record"],
      }),
      listRecords: builder.query<
        {
          list: IRecord[];
          reachedEnd: boolean;
          lastPage: number;
        },
        number
      >({
        async queryFn(arg) {
          const pageSize = 10;

          const resultPage = await (await getDb()).record.toArray();
          const sortedResult = resultPage
            .sort((a, b) => a.id! - b.id!)
            .slice(arg * pageSize, (arg + 1) * pageSize);
          return {
            data: {
              list: sortedResult,
              reachedEnd: sortedResult.length < pageSize,
              lastPage: arg,
            },
          };
        },
        serializeQueryArgs: (e) => {
          return e.endpointName;
        },
        merge(currentCacheData, responseData, _otherArgs) {
          currentCacheData.list.push(...responseData.list);
          currentCacheData.lastPage = responseData.lastPage;
          currentCacheData.reachedEnd = responseData.reachedEnd;
        },

        forceRefetch(params) {
          return params.currentArg !== params.previousArg;
        },
      }),

      addActivity: builder.mutation<null, IActivity>({
        async queryFn(arg) {
          await (await getDb()).activity.add(arg);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Activity"],
      }),

      editActivity: builder.mutation<null, IActivity>({
        async queryFn(arg) {
          await (await getDb()).activity.update(arg.id!, arg);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Activity"],
      }),

      deleteActivity: builder.mutation<null, IActivity>({
        async queryFn(arg) {
          const db = await getDb();
          await db.record.where("activityId").equals(arg.id!).delete();
          await db.activity.delete(arg.id!);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Activity", "Record"],
      }),

      checkUnusedActivityName: builder.mutation<
        boolean,
        {
          value: string;
          activityName?: string;
        }
      >({
        async queryFn({ value, activityName }) {
          return {
            data:
              (await (
                await getDb()
              ).activity
                .where("name")
                .equalsIgnoreCase(value)
                .filter((v) => v.name !== activityName)
                .count()) !== 0,
          };
        },
      }),

      addRecord: builder.mutation<null, IRecord>({
        async queryFn(arg) {
          await (await getDb()).record.add(arg);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Record"],
      }),
    };
  },
});

export const {
  useAddActivityMutation,
  useGetRecordsQuery,
  useLazyGetRecordsQuery,
  useListRecordsQuery,
  useGetActivityQuery,
  useEditActivityMutation,
  useDeleteActivityMutation,
  useAddRecordMutation,
} = activityApi;
