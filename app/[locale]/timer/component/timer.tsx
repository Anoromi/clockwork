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
  //  i.millisecond()
  let step = now.startOf("second").add(i.millisecond());
  while (step.isBefore(now)) {
    // console.log('hehe')
    step = step.add(1, "second");
  }
  return step.diff(now, "millisecond");
  return 1000;
}

function dateToDisplay(date: Dayjs, initial: Dayjs): string {
  let minutes = (date.diff(initial, "minute") % 60).toString();
  let seconds = (date.diff(initial, "second") % 60).toString();

  if (minutes.length === 1) minutes = "0" + minutes;

  if (seconds.length === 1) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;

  // return date.toISOString().substring(11,19)
}

export default function Timer({ initial, className }: Props) {
  let seconds = useReactive("00:00");

  useEffect(() => {
    let executing = true;
    //console.log("changed", initial);

    const ex = () => {
      if (initial === undefined || initial.lastContinue === undefined) return;
      //console.log(dayjs(initial.lastContinue));
      return setTimeout(() => {
        //console.log("jenny", executing);
        if (!executing || initial === undefined) return;
        // initial
        seconds.set(
          dateToDisplay(
            dayjs(Date.now()).add(initial.extraMilliseconds, "millisecond"),
            dayjs(initial.lastContinue),
          ),
        );
        //console.log("hehe");
        ex();
      }, calculateNextStep(initial.lastContinue));
    };

    ex();

    return () => {
      executing = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  return <span className={className}>{seconds.value}</span>;
}
