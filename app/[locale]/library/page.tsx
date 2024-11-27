"use client";

import styles from "@/app/[locale]/library/page.module.scss";
import Flex from "@/app/components/layout/flex";
import Title from "@/app/components/text/title";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
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
            <Title href="/">Library</Title>
            <OptionsMenu />
          </Flex>
          <TabGroup as={Fragment}>
            <TabPanels as={Fragment}>
              <TabPanel as={Fragment}>
                <LibraryList />
              </TabPanel>
              <TabPanel as={Fragment}>
                <ActivityList />
              </TabPanel>
            </TabPanels>
            <LibraryTab />
          </TabGroup>
        </div>
      </main>
      <LibraryAddDialog />
      <LibraryEditActivityDialog />
      <LibraryDeleteAcivityDialog />
    </>
  );
}
