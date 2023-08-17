"use client";

import styles from "@/app/[locale]/library/components/libraryTabs.module.scss";
import RippleButton from "@/app/components/ripple-button";
import { useReactive } from "@/app/components/useReactive";
import utilStyles from "@/app/styles/utils.module.scss";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useRef } from "react";

export default function LibraryTab() {
  let options = [
    {
      onclick: () => {},
      text: "Records",
    },

    {
      onclick: () => {},
      text: "Activities",
    },
  ];

  const tabIndicatorBox = useRef<HTMLDivElement | null>(null);

  const position = useReactive<{
    left: number;
    top: number;
  } | null>(null);

  function drawTo(left: number, top: number) {
    //tabIndicatorBox.current!.style = {
    //  left: left,
    //  top: top,
    //};
    position.set({
      left,
      top,
    });
  }

  return (
    <>
      <Tab.List className={styles.tabWrapper} data-tab-wrapper={"true"}>
        {position.value !== null ? (
          <div
            className={styles.tabIndicatorBox}
            ref={tabIndicatorBox}
            style={position.value}
          ></div>
        ) : (
          <></>
        )}
        {options.map((v) => (
          <Tab className={utilStyles.contents} key={v.text}>
            {({ selected }) => (
              <RippleButton
                className={classNames(styles.tabItem, {
                  [styles.selected]: selected,
                })}
                as="div"
              >
                <TabIndicator selected={selected} drawTo={drawTo} />
                {v.text}
              </RippleButton>
            )}
          </Tab>
        ))}
      </Tab.List>
    </>
  );
}

function TabIndicator({
  selected,
  drawTo,
}: {
  selected: boolean;
  drawTo: (left: number, top: number) => void;
}) {
  const value = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("indicator", selected, value.current);
    if (selected && value.current !== undefined) {
      let posL = value.current!.offsetLeft;
      let posT = value.current!.offsetTop;

      let parent = value.current!.offsetParent as HTMLElement;
      console.log("hhee");
      while (parent !== null && parent.dataset.tabWrapper !== "true") {
        posL += parent.offsetLeft;
        posT += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement;
      }
      console.log("draw to", posL, posT);
      drawTo(posL, posT);
    }
  }, [selected]);

  return (
    <>
      <div ref={value} className={styles.tabIndicatorBoxMarker}></div>
    </>
  );
}
