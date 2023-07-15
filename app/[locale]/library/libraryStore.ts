import { IActivity, IRecord } from "@/app/backend/database";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  recordList: IRecord[] | null;
  activityMap: IActivity[] | null;
  loading: boolean;
};

const initialState: State = {
  recordList: null,
  activityMap: null,
  loading: true,
};

//const testState: State = {
//  recordList: [
//    {
//      activityId: 1,
//      date: new Date().getTime(),
//      records: [
//        [1, 2],
//        [1, 2],
//        [1, 2],
//        [1, 2],
//        [1, 2],
//        [1, 2],
//        [1, 2],
//        [1, 2],
//      ],
//      id: undefined,
//    },
//    {
//      activityId: 1,
//      date: new Date().getTime(),
//      records: [[1, 2]],
//      id: undefined,
//    },
//  ],
//  activityMap: new Map([
//    [
//      1,
//      {
//        metrics: [
//          {
//            name: "count",
//            metric: "",
//          },
//          {
//            name: "weight",
//            metric: "kg",
//          },
//        ],
//        name: "Hello",
//        id: 1,
//      },
//    ],
//  ]),
//  loading: false,
//};

const librarySlice = createSlice({
  initialState: initialState,
  name: "libraryStore",
  reducers: {
    setLibraryData(
      state,
      data: PayloadAction<{
        records: IRecord[] | null;
        activities: IActivity[] | null;
      }>
    ) {
      state.recordList = data.payload.records;
      state.activityMap = data.payload.activities;
      state.loading = false;
    },
  },
});

export const { setLibraryData } = librarySlice.actions;
export default librarySlice.reducer;
