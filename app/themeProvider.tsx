import { useAppSelector } from "./utils/clientUseRedux";
import styles from "@/app/themeProvider.module.scss"
import classNames from "classnames";

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider({ children }: Props) {
  const theme = useAppSelector((state) => state.extra.theme);

  return <div className={classNames(styles.themeProvider, theme)}>{children}</div>;
}
