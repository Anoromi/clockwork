import { useAppSelector } from "./utils/clientUseRedux";
import styles from "@/app/ThemeProvider.module.scss"

type Props = React.PropsWithChildren<{}>;

export default function ThemeProvider({ children }: Props) {
  const theme = useAppSelector((state) => state.extra.theme);

  return <div className={theme}>{children}</div>;
}
