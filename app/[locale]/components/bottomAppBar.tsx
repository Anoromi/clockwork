"use client";

import styles from "@/app/[locale]/components/bottomAppBar.module.scss";
import { useRipple } from "@/app/components/useRipple";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BottomAppBarProps = {
  locale: string;
};

export function BottomAppBar({ locale }: BottomAppBarProps) {
  const pathName = usePathname();

  return (
    <>
      <div className={styles.appBarWrapper}>
        <AppBarIcon
          icon="material-symbols:timer"
          text="Timer"
          selected={pathName.includes("timer")}
          href={`/${locale}/timer`}
        />
        <AppBarIcon
          icon="fluent:library-20-filled"
          text="Library"
          selected={pathName.includes("library")}
          href={`/${locale}/library`}
        />
      </div>
    </>
  );
}

function AppBarIcon({
  icon,
  text,
  selected,
  href,
}: {
  icon: string;
  text: string;
  selected: boolean;
  href: string;
}) {
  const { buttonData, rippleData } = useRipple();
  return (
    <Link
      href={href}
      {...buttonData}
      className={classNames(styles.route, buttonData.className, {
        [styles.selectedRoute]: selected,
      })}
    >
      <div {...rippleData}></div>
      <Icon icon={icon} fontSize={24} className={styles.routeIcon} />
      {text}
    </Link>
  );
}
