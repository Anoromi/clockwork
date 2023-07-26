"use client";

import TimerPage from "../timer/page";
import styles from "@/app/[locale]/library/page.module.scss";
import { LibrarySelectActivity } from "./components/selectActivity";
import { useAppDispatch, useAppSelector } from "@/app/utils/clientUseRedux";
import RecordItem from "./components/recordItem";
import { notNull, notUnd } from "@/app/utils/notNull";
import { useQuery } from "react-query";
import { getDb } from "@/app/backend/database";
import { Fragment, useEffect } from "react";
import { record } from "../timer/timerStore";
import { setActivityData, setRecordsData } from "./libraryStore";
import ClientOnly from "@/app/components/ClientOnly";
import LibraryTab from "./components/libraryTabs";
import { Tab } from "@headlessui/react";
import utilStyles from "@/app/styles/utils.module.scss";
import ActivityItem from "./components/activityItem";
import OptionsMenu from "./components/optionsMenu";
import LibraryAddDialog from "./components/addDialog";
import {ActivityList, LibraryList} from "./components/lists";

export default function LibraryPage() {
  const state = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();
  //console.log("running whee");

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Timer</h1>
            <OptionsMenu />
          </header>

          <Tab.Group>
            <Tab.Panels as={Fragment}>
              <Tab.Panel className={utilStyles.contents}>
                <div className={styles.eventsContent}>
                  <div className={styles.selectActivityWrapper}>
                    <LibrarySelectActivity />
                  </div>
                  <ClientOnly>
                    <LibraryList />
                  </ClientOnly>
                </div>
              </Tab.Panel>
              <Tab.Panel className={utilStyles.contents}>
                <div className={styles.eventsContent}>
                  <ClientOnly>
                    <ActivityList />
                  </ClientOnly>
                </div>
              </Tab.Panel>
            </Tab.Panels>

            <LibraryTab />
          </Tab.Group>
        </div>
      </main>
      <LibraryAddDialog/>
    </>
  );
}

