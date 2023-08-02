import { getDb, IActivity, IRecord } from "@/app/backend/database";
import { wait } from "@/app/utils/wait";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query";

type State = {
  records: {
    //recordList: IRecord[] | null;
    //activityList: IActivity[] | null;
    //loading: boolean;
    //dirty: boolean;
  };
  activities: {
    //actvityList: IActivity[] | null;
    //loading: boolean;
    //dirty: boolean;
    edit: {
      selected: IActivity | null;
    };
    delete: {
      selected: IActivity | null;
    };
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
    //recordList: null,
    //activityList: null,
    //loading: true,
    //dirty: true,
  },
  activities: {
    //actvityList: null,
    //loading: true,
    //dirty: true,
    edit: {
      selected: null,
    },
    delete: {
      selected: null,
    },
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

const editActivity = createAsyncThunk(
  "libraryStore/editActivity",
  async ({
    previousAc,
    newAc,
  }: {
    previousAc: IActivity;
    newAc: IActivity;
  }) => {
    const db = await getDb();
    await db.activity.update(previousAc.id!, newAc);
  }
);

const deleteActivity = createAsyncThunk(
  "libraryStore/deleteActivity",
  async (activity: IActivity) => {
    const db = await getDb();
    console.log(
      "deleting",
      await db.record.where("activityId").equals(activity.id!).toArray()
    );
    await db.record.where("activityId").equals(activity.id!).delete();
    await db.activity.delete(activity.id!);
    console.log(activity.id);
    console.log(await db.activity.toArray());
    console.log("record", await db.record.toArray());
    console.log("deleted");
  }
);


const librarySlice = createSlice({
  initialState: initialState,
  name: "libraryStore",
  reducers: {
    //setRecordsData(
    //  state,
    //  data: PayloadAction<{
    //    records: IRecord[] | null;
    //    activities: IActivity[] | null;
    //  }>,
    //) {
    //  state.records.recordList = data.payload.records;
    //  state.records.activityList = data.payload.activities;
    //  state.records.loading = false;
    //},

    //changeRecordsToLoading(state, data: PayloadAction<undefined>) {
    //  state.records.dirty = false;
    //  state.records.loading = true;
    //},

    //setActivityData(
    //  state,
    //  data: PayloadAction<{
    //    activities: IActivity[] | null;
    //  }>
    //) {
    //  state.activities.actvityList = data.payload.activities;
    //  state.activities.loading = false;
    //},

    //changeActivityToLoading(state, data: PayloadAction<undefined>) {
    //  state.activities.dirty = false;
    //  state.activities.loading = true;
    //},

    changeAddDialog(state, data: PayloadAction<boolean>) {
      state.menuOptions.openedAddDialog = data.payload;
    },

    selectEditActivity(state, data: PayloadAction<IActivity | null>) {
      state.activities.edit.selected = data.payload;
    },

    selectDeleteActivity(state, data: PayloadAction<IActivity | null>) {
      state.activities.delete.selected = data.payload;
    },

    //addActivity(state, data: PayloadAction<boolean>) {},
  },
  extraReducers: (builder) => {
    //builder.addCase(addActivity.fulfilled, (state, action) => {
    //  state.activities.dirty = true;
    //  state.records.dirty = true;
    //  state.menuOptions.addDialog.submitting = false;
    //  state.menuOptions.openedAddDialog = false;
    //  //state.menuOptions.addDialog.nameUsed
    //});
    //builder.addCase(addActivity.pending, (state, action) => {
    //  state.menuOptions.addDialog.submitting = true;
    //});

    //builder.addCase(editActivity.pending, (state, action) => {
    //  state.activities.edit.selected = null;
    //});

    //builder.addCase(editActivity.fulfilled, (state, action) => {
    //  state.activities.dirty = true;
    //  state.records.dirty = true;
    //  state.activities.actvityList = null;
    //  state.records.activityList = null;
    //  state.activities.loading = true;
    //  state.records.loading = true;
    //});

    //builder.addCase(deleteActivity.pending, (state, action) => {
    //  state.activities.delete.selected = null;
    //});

    //builder.addCase(deleteActivity.fulfilled, (state, action) => {
    //  console.log("marking dirty");
    //  state.activities.dirty = true;
    //  state.records.dirty = true;
    //  state.activities.actvityList = null;
    //  state.records.activityList = null;
    //  state.records.recordList = null;
    //  state.activities.loading = true;
    //  state.records.loading = true;
    //});
  },
});

export const {
  //setRecordsData,
  //setActivityData,
  changeAddDialog,
  //changeRecordsToLoading,
  //changeActivityToLoading,
  selectEditActivity,
  selectDeleteActivity,
} = librarySlice.actions;
//export { addActivity, editActivity, deleteActivity };
export default librarySlice.reducer;
