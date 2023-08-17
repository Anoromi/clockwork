import { IActivity } from "../backend/database";
import { wait } from "./wait";

export async function getUserExercises(): Promise<IActivity[]> {
  await wait(500);
  return [
    {
      name: "Sit up",
      metrics: [
        {
          metric: "kg",
          name: "weight",
        },
      ],
    },
    {
      name: "Something",
      metrics: [
        {
          metric: "kg",
          name: "weight",
        },
        {
          metric: "",
          name: "Count",
        },
      ],
    },
  ];
}
