import { useEffect } from "react";
import { Theme, changeTheme } from "./extraStore";
import { useAppDispatch, useAppSelector } from "./utils/clientUseRedux";
import { isClient } from "./utils/isClient";

export function useTheme() {
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

  return theme;
}
