"use client";
import styles from "@/app/[locale]/layout.module.scss";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useReactive } from "../components/useReactive";
import { rubik } from "../styles/fonts";
import { isClient } from "../utils/isClient";

type Props = React.PropsWithChildren<{}>;

export default function PageResizer({ children }: Props) {
  //const { value: height, set: setHeight } = useReactive<number | undefined>(
  //  undefined
  //);

  //useEffect(() => {
  //  if (isClient()) {
  //    setHeight(document.documentElement.clientHeight);
  //    window.addEventListener("orientationchange", (ev) => {
  //      console.log("orientationchange", ev);
  //      console.log("innerHeight", window.innerHeight);
  //      console.log("clientHeight", document.documentElement.clientHeight);
  //    });
  //    window.addEventListener("resize", (ev) => {
  //      console.log("resize", ev);
  //      console.log("innerHeight", window.innerHeight);
  //      console.log("clientHeight", document.documentElement.clientHeight);
  //      console.log(
  //        "reference",
  //        window.innerHeight,
  //        document.documentElement.clientHeight
  //      );
  //      if (document.documentElement.clientHeight - window.innerHeight < 100) {
  //        setHeight(window.innerHeight);
  //      }
  //    });
  //    //window.addEventListener("", (ev) => {
  //    //  console.log("resize", ev);
  //    //});
  //  }
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [setHeight]);

  return (
    <body className={classNames(rubik.className, styles.body)}>{children}</body>
  );
}
