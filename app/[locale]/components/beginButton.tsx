"use client";

import { useRipple } from "@/app/components/useRipple";
import { Link } from "@/app/routing";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./beginButton.module.scss";

export function BeginButton({ children }: PropsWithChildren<{}>) {
  const { buttonData, rippleData } = useRipple();
  return (
    <Link
      href="/timer"
      {...buttonData}
      className={classNames(styles.button, buttonData.className)}
    >
      <div {...rippleData}></div>
      Begin
    </Link>
  );
}
