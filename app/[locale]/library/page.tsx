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
import ClientOnly from "@/app/components/ClientOnly";
import LibraryTab from "./components/libraryTabs";
import { Tab } from "@headlessui/react";
import utilStyles from "@/app/styles/utils.module.scss";
import ActivityItem from "./components/activityItem";
import OptionsMenu from "./components/optionsMenu";
import LibraryAddDialog from "./components/addDialog";
import { ActivityList, LibraryList } from "./components/lists";
import LibraryEditActivityDialog from "./components/libraryEditActivityDialog";
import LibraryDeleteAcivityDialog from "./components/deleteActivityDialog";
import Title from "@/app/components/text/title";

export default function LibraryPage() {
  const state = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Title>Library</Title>
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
      <LibraryAddDialog />
      <LibraryEditActivityDialog />
      <LibraryDeleteAcivityDialog />
    </>
  );
}
