import { getDb, IActivity, IRecord } from "@/app/backend/database";
import { wait } from "@/app/utils/wait";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  records: {
    recordList: IRecord[] | null;
    activityList: IActivity[] | null;
    loading: boolean;
    dirty: boolean;
  };
  activities: {
    actvityList: IActivity[] | null;
    loading: boolean;
    dirty: boolean;
  };
  currentTab: "activities" | "records";
  menuOptions: {
    openedAddDialog: boolean;
    addDialog: {
      submitting: boolean;
      //nameUsed: boolean;
    };
  };
};

const initialState: State = {
  records: {
    recordList: null,
    activityList: null,
    loading: true,
    dirty: true,
  },
  activities: {
    actvityList: null,
    loading: true,
    dirty: true,
  },
  currentTab: "records",
  menuOptions: {
    openedAddDialog: false,
    addDialog: {
      submitting: false,
      //nameUsed: false,
    },
  },
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
//

const addActivity = createAsyncThunk(
  "libraryStore/addActivity",
  async (activity: IActivity) => {
    await wait(300);
    const db = await getDb();
    await db.activity.add(activity);
  }
);

const librarySlice = createSlice({
  initialState: initialState,
  name: "libraryStore",
  reducers: {
    setRecordsData(
      state,
      data: PayloadAction<{
        records: IRecord[] | null;
        activities: IActivity[] | null;
      }>
    ) {
      state.records.recordList = data.payload.records;
      state.records.activityList = data.payload.activities;
      state.records.loading = false;
    },

    changeRecordsToLoading(state, data: PayloadAction<undefined>) {
      state.records.dirty = false;
      state.records.loading = true;
    },

    setActivityData(
      state,
      data: PayloadAction<{
        activities: IActivity[] | null;
      }>
    ) {
      state.activities.actvityList = data.payload.activities;
      state.activities.loading = false;
    },

    changeActivityToLoading(state, data: PayloadAction<undefined>) {
        state.activities.dirty = false
        state.activities.loading = true; 
    },

    changeAddDialog(state, data: PayloadAction<boolean>) {
      state.menuOptions.openedAddDialog = data.payload;
    },

    //addActivity(state, data: PayloadAction<boolean>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(addActivity.fulfilled, (state, action) => {
      state.activities.dirty = true;
      state.records.dirty = true;
      state.menuOptions.addDialog.submitting = false;
      state.menuOptions.openedAddDialog = false;
      //state.menuOptions.addDialog.nameUsed
    });
    builder.addCase(addActivity.pending, (state, action) => {
      state.menuOptions.addDialog.submitting = true;
    });
  },
});

export const { setRecordsData, setActivityData, changeAddDialog, changeRecordsToLoading, changeActivityToLoading } =
  librarySlice.actions;
export { addActivity };
export default librarySlice.reducer;
