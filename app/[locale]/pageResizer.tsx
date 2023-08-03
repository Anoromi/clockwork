"use client";
import styles from "@/app/[locale]/layout.module.scss";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useReactive } from "../components/useReactive";
import { rubik } from "../styles/fonts";
import { isClient } from "../utils/isClient";

type Props = React.PropsWithChildren<{}>;

export default function PageResizer({ children }: Props) {
  const { value: height, set: setHeight } = useReactive<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (isClient()) setHeight(document.documentElement.clientHeight);
  }, []);

  return (
    <body className={classNames(rubik.className, styles.body)} style={{
        height: height
      }}>{children}</body>
  );
}
