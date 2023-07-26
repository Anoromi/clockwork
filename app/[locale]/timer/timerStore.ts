import { IActivity, IRecord } from "@/app/backend/database";
import {
  PausableTime,
  pauseTimer,
  resumeTimer,
} from "@/app/utils/pausableTime";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

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
  counter: number;
};

const initialState: State = {
  record: null,
  currentTimer: null,
  selectedActivity: null,
  counter: 0,
};

//const testState: State = {
//  record: {
//    activity: {
//      metrics: [
//        {
//          metric: "kg",
//          name: "Weight",
//        },
//      ],
//      name: "some activity",
//    },
//    date: new Date().getDate(),
//    records: [[20], [30]],
//  },
//  currentTimer: {
//    firstRecordTimestamp: {
//      extraMilliseconds: 0,
//      lastContinue: new Date().getTime(),
//      paused: false,
//    },
//    currentRecordTimestamp: {
//      extraMilliseconds: 0,
//      lastContinue: new Date().getTime(),
//      paused: false,
//    },
//  },
//  counter: 0,
//};

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

    increment(state) {
      // console.log(state)
      state.counter++;
    },

    record(state, record: PayloadAction<number[]>) {
      state.record!.records.push(record.payload);
      state.currentTimer!.currentRecordTimestamp = {
        extraMilliseconds: 0,
        paused: false,
        lastContinue: Date.now(),
      };
    },

    stop(state) {
      // dayjs(state.currentTimer!.currentRecordTimestamp)
      // state.currentTimer = undefined
      state.currentTimer = null;
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
      state.selectedActivity = data.payload
    }
  },
});

export const {
  start,
  increment,
  record,
  stop: stopTimer,
  resume,
  pause,
  selectActivity
} = timerSlice.actions;
export default timerSlice.reducer;
