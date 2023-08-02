import { useAppDispatch, useAppSelector } from "./utils/clientUseRedux";
import styles from "@/app/themeProvider.module.scss";
import classNames from "classnames";
import { useEffect } from "react";
import { changeTheme, Theme } from "./extraStore";
import {isClient} from "./utils/isClient";

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider({ children }: Props) {
  const theme = useAppSelector((state) => state.extra.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isClient()) {
      const theme = localStorage.getItem("theme");
      
      if (theme !== null) {
        dispatch(changeTheme(theme as Theme));
      }
    }
  }, [dispatch]);

  return (
    <div className={classNames(styles.themeProvider, theme)}>{children}</div>
  );
}
