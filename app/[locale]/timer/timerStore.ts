import { IActivity, IRecord } from "@/app/backend/database";
import {
  PausableTime,
  pauseTimer,
  resumeTimer,
} from "@/app/utils/pausableTime";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { activityApi } from "../library/api";

type StartedTimer = {
  firstRecordTimestamp: PausableTime;
  currentRecordTimestamp: PausableTime;
};

type State = {
  record: {
    activity: IActivity;
    records: number[][];
    date: number;
  } | null;
  selectedActivity: IActivity | null;
  currentTimer: StartedTimer | null;
  openedRecord: boolean;
};

const initialState: State = {
  record: null,
  currentTimer: null,
  selectedActivity: null,
  openedRecord: false,
};

function createStartTimer(): StartedTimer {
  return {
    firstRecordTimestamp: {
      extraMilliseconds: 0,
      lastContinue: new Date().getTime(),
      paused: false,
    },
    currentRecordTimestamp: {
      extraMilliseconds: 0,
      lastContinue: new Date().getTime(),
      paused: false,
    },
  };
}

const createRecord = createAsyncThunk(
  "timerSlice/stopRecord",
  async (record: IRecord, thunkApi) => {
    if (record.records.length === 0)
      thunkApi.dispatch(timerSlice.actions.abortRecording());
    else thunkApi.dispatch(activityApi.endpoints.addRecord.initiate(record));
  },
);

export const timerSlice = createSlice({
  name: "timerSlice",
  initialState: initialState,

  reducers: {
    start(state, action: PayloadAction<undefined>) {
      state.currentTimer = createStartTimer();
      state.record = {
        activity: state.selectedActivity!,
        records: [],
        date: new Date().getTime(),
      };
    },

    record(state, record: PayloadAction<number[]>) {
      state.record!.records.push(record.payload);
      state.currentTimer!.currentRecordTimestamp = {
        extraMilliseconds: 0,
        paused: false,
        lastContinue: Date.now(),
      };
    },

    abortRecording(state) {
      state.currentTimer = null;
      state.record = null;
    },

    pause(state) {
      console.log("actually");
      const resume = state.currentTimer?.currentRecordTimestamp.lastContinue;
      const now = dayjs(Date.now());
      pauseTimer(state.currentTimer!.currentRecordTimestamp);
      pauseTimer(state.currentTimer!.firstRecordTimestamp);

      // const start = dayjs(Date.now())
      // state.currentTimer = {

      // }
    },

    resume(state) {
      const resume = state.currentTimer?.currentRecordTimestamp.lastContinue;
      const now = dayjs(Date.now());

      resumeTimer(state.currentTimer!.currentRecordTimestamp);
      resumeTimer(state.currentTimer!.firstRecordTimestamp);
    },

    selectActivity(state, data: PayloadAction<IActivity | null>) {
      state.selectedActivity = data.payload;
    },

    setOpenedRecord(state, data: PayloadAction<boolean>) {
      state.openedRecord = data.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createRecord.fulfilled, (state) => {
      console.log("ended");
      state.record = null;
      state.currentTimer = null;
    });
  },
});

export const { start, record, resume, pause, selectActivity, setOpenedRecord } =
  timerSlice.actions;
export { createRecord };
export default timerSlice.reducer;
