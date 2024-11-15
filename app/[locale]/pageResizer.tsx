"use client";
import styles from "@/app/[locale]/layout.module.scss";
import classNames from "classnames";
import { rubik } from "../styles/fonts";
import { useTheme } from "../useTheme";

type Props = React.PropsWithChildren<{}>;

export default function PageResizer({ children }: Props) {
  const theme = useTheme();
  return (
    <body className={classNames(rubik.className, styles.body, theme)}>
      {children}
    </body>
  );
}
