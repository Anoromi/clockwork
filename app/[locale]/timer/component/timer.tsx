"use client";
import { useReactive } from "@/app/components/useReactive";
import { PausableTime } from "@/app/utils/pausableTime";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

type Props = {
  initial?: PausableTime;
  className?: string;
};

function calculateNextStep(initial: number) {
  const i = dayjs(initial);
  const now = dayjs();
  let step = now.startOf("second").add(i.millisecond());
  while (step.isBefore(now)) {
    step = step.add(1, "second");
  }
  return step.diff(now, "millisecond");
}

function dateToDisplay(date: Dayjs, initial: Dayjs): string {
  let minutes = (date.diff(initial, "minute") % 60).toString();
  let seconds = (date.diff(initial, "second") % 60).toString();

  if (minutes.length === 1) minutes = "0" + minutes;

  if (seconds.length === 1) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;
}

export default function Timer({ initial, className }: Props) {
  let seconds = useReactive("00:00");

  useEffect(() => {
    let executing = true;

    const execute = () => {
      if (initial === undefined || initial.lastContinue === undefined) return;
      return setTimeout(() => {
        if (!executing || initial === undefined) return;
        seconds.set(
          dateToDisplay(
            dayjs(Date.now()).add(initial.extraMilliseconds, "millisecond"),
            dayjs(initial.lastContinue),
          ),
        );
        execute();
      }, calculateNextStep(initial.lastContinue));
    };

    execute();

    return () => {
      executing = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  return <span className={className}>{seconds.value}</span>;
}
