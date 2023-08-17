"use client";

import styles from "@/app/[locale]/library/page.module.scss";
import Flex from "@/app/components/layout/flex";
import Title from "@/app/components/text/title";
import utilStyles from "@/app/styles/utils.module.scss";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import LibraryAddDialog from "./components/addDialog";
import LibraryDeleteAcivityDialog from "./components/deleteActivityDialog";
import LibraryEditActivityDialog from "./components/libraryEditActivityDialog";
import LibraryTab from "./components/libraryTabs";
import { ActivityList, LibraryList } from "./components/lists";
import OptionsMenu from "./components/optionsMenu";

export default function LibraryPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Flex<"header">
            as="header"
            justifyContent={"space-between"}
            alignItems={"center"}
            className={styles.header}
            paddingLeft={"1rem"}
            paddingRight={"1rem"}
          >
            <Title>Libary</Title>
            <OptionsMenu />
          </Flex>

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
