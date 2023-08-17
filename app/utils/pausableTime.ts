import dayjs from "dayjs";

export type PausableTime = {
  extraMilliseconds: number;
  lastContinue?: number;
  paused: boolean;
};

export function isPaused(
  value: PausableTime,
): value is PausableTime & { lastContinue: number } {
  return value.paused;
}

export function pauseTimer(time: PausableTime) {
  if (isPaused(time)) return;

  time.paused = true;
  let now = dayjs(Date.now());
  let then = dayjs(time.lastContinue!);
  time.extraMilliseconds += now.diff(then, "milliseconds");
  time.lastContinue = undefined;
}

export function resumeTimer(time: PausableTime) {
  console.assert(isPaused(time));

  time.paused = false;
  time.lastContinue = new Date().getTime();
}
