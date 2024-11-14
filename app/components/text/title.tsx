"use client";
import styles from "@/app/components/text/title.module.scss";

type Props = React.PropsWithChildren<{
  href?: string;
}>;

export default function Title({ children, href }: Props) {
  const content = <h1 className={styles.title}>{children}</h1>;

  if (href !== undefined) return <a href={href} className={styles.a}>{content}</a>;
}
