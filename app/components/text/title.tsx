"use client";
import styles from "@/app/components/text/title.module.scss";
import Link from "next/link";

type Props = React.PropsWithChildren<{
  href?: string;
}>;

export default function Title({ children, href }: Props) {
  const content = <h1 className={styles.title}>{children}</h1>;

  if (href !== undefined) return <Link href={href} className={styles.a}>{content}</Link>;
}
