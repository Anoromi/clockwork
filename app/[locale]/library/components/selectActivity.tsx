"use client";

import RippleButton from "@/app/components/ripple-button";
import { getUserExercises } from "@/app/utils/load";
import styles from "@/app/[locale]/library/components/selectActivity.module.scss";
import { Listbox } from "@headlessui/react";
import { useQuery } from "react-query";
import utilStyles from "@/app/styles/utils.module.scss";
import { useReactive } from "@/app/components/useReactive";
import { getDb, IActivity } from "@/app/backend/database";
import classNames from "classnames";
import { Icon } from "@iconify/react";

export function LibrarySelectActivity() {
  const data = useQuery("activities", async () =>
    (await getDb()).activity.toArray()
  );
  const selectedActivity = useReactive<IActivity | null>(null);

  return (
    <>
      <span className={styles.listbox}>
        <Listbox value={selectedActivity.value} onChange={selectedActivity.set}>
          <Listbox.Button className={utilStyles.contents}>
            {(state) => (
              <RippleButton as="div" className={styles.listboxButton}>
                {selectedActivity.value?.name ?? "Activity"}
                <Icon icon="octicon:chevron-down-12" fontSize={24} />
              </RippleButton>
            )}
          </Listbox.Button>

          <Listbox.Options className={styles.options}>
            {data.isLoading ? <></> : data.data!.map((activity) => (
              <Listbox.Option
                key={activity.name}
                value={activity}
                className={utilStyles.contents}
              >
                <RippleButton as="div" className={styles.option}>
                  {activity.name}
                </RippleButton>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </span>
    </>
  );
}
