import { PERecords } from "@/app/utils/data"
import { PausableTime, pauseTimer } from "@/app/utils/pausableTime"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"

type StartedTimer = {
	firstRecordTimestamp: PausableTime
	currentRecordTimestamp: PausableTime
}

type State = {
	previousActions: PERecords | null
	currentTimer: StartedTimer | null
	counter: number
}

const initialState: State = {
	previousActions: null,
	currentTimer: null,
	counter: 0,
}

export const timerSlice = createSlice({
	name: "timerSlice",
	initialState,

	reducers: {
		start(state) {
			state.currentTimer = {
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
			}
		},

		increment(state) {
			// console.log(state)
			state.counter++
		},

		record(state, action: PayloadAction<unknown>) {
			// state.previousActions.push(action.payload)
		},

		stop(state) {
			// dayjs(state.currentTimer!.currentRecordTimestamp)
			// state.currentTimer = undefined
		},

		pause(state) {
			const resume = state.currentTimer?.currentRecordTimestamp.lastContinue
			const now = dayjs(Date.now())
			pauseTimer(state.currentTimer!.currentRecordTimestamp)
			pauseTimer(state.currentTimer!.firstRecordTimestamp)
			// const start = dayjs(Date.now())
			// state.currentTimer = {

			// }
		},
	},
})

export const { start, increment, record, stop } = timerSlice.actions
export default timerSlice.reducer
