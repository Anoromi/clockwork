"use client";
import styles from "@/app/components/text/title.module.scss";

type Props = React.PropsWithChildren<{}>;

export default function Title({ children }: Props) {
  return <h1 className={styles.title}>{children}</h1>;
}
