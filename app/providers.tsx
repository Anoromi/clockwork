"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type Props = React.PropsWithChildren<{}>;

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
