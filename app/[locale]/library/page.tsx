"use client";

import ClientOnly from "@/app/components/ClientOnly";
import Title from "@/app/components/text/title";
import utilStyles from "@/app/styles/utils.module.scss";
import {notUnd} from "@/app/utils/notNull";
import styles from "@/app/[locale]/library/page.module.scss";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import LibraryAddDialog from "./components/addDialog";
import LibraryDeleteAcivityDialog from "./components/deleteActivityDialog";
import LibraryEditActivityDialog from "./components/libraryEditActivityDialog";
import LibraryTab from "./components/libraryTabs";
import { ActivityList, LibraryList } from "./components/lists";
import OptionsMenu from "./components/optionsMenu";
import { LibrarySelectActivity } from "./components/selectActivity";

export default function LibraryPage() {
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
                  <LibraryList />
              </Tab.Panel>
              <Tab.Panel className={utilStyles.contents}>
                  <ActivityList />
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
