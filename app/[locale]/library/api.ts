import { getDb, IActivity, IRecord } from "@/app/backend/database";
import { wait } from "@/app/utils/wait";
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
  baseQuery: (query: Query) => {
    return { data: undefined };
  },
  endpoints(builder) {
    return {
      getActivity: builder.query<IActivity[], void>({
        async queryFn(arg, api, extraOptions, baseQuery) {
          return {
            data: await (await getDb()).activity.toArray(),
          };
        },
        providesTags: ["Activity"],
      }),
      getRecords: builder.query<IRecord[], void>({
        async queryFn(arg, api, extraOptions, baseQuery) {
          return {
            data: await (await getDb()).record.toArray(),
          };
        },
        providesTags: ["Record"],
      }),

      addActivity: builder.mutation<null, IActivity>({
        async queryFn(arg, api, extraOptions, baseQuery) {
          await (await getDb()).activity.add(arg);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Activity"],
      }),

      editActivity: builder.mutation<null, IActivity>({
        async queryFn(arg, api, extraOptions, baseQuery) {
          //await wait(3000);
          console.log(arg);
          await (await getDb()).activity.update(arg.id!, arg);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Activity"],
      }),

      deleteActivity: builder.mutation<null, IActivity>({
        async queryFn(arg, api, extraOptions, baseQuery) {
          //await wait(3000);
          //await (await getDb()).activity.update(arg.id!, arg);
          const db = await getDb();
          await db.record.where("activityId").equals(arg.id!).delete();
          await db.activity.delete(arg.id!);
          return {
            data: null,
          };
        },
        invalidatesTags: ["Activity", "Record"],
      }),

      checkUnsuedActivityName: builder.mutation<
        boolean,
        {
          value: string;
          activityName?: string;
        }
      >({
        async queryFn({ value, activityName }, api, extraOptions, baseQuery) {
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

      addRecord: builder.mutation<void, IRecord>({
        async queryFn(arg, api, extraOptions, baseQuery) {
          console.log("executing add record");
          await (await getDb()).record.add(arg);
          return {
            data: undefined,
          };
        },
        invalidatesTags: ["Record"],
      }),

      //editAcitivity: builder.mutation<null, IActivity>({
      //  async queryFn(arg, api, extraOptions, baseQuery) {

      //  }
      //})
    };
  },
});

export const {
  useAddActivityMutation,
  useGetRecordsQuery,
  useGetActivityQuery,
  useEditActivityMutation,
  useDeleteActivityMutation,
  useAddRecordMutation,
} = activityApi;
