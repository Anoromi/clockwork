"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import styles from "@/app/providers.module.scss";
import classNames from "classnames";
import ThemeProvider from "./themeProvider";



type Props = React.PropsWithChildren<{}>;

const queryClient = new QueryClient();

function makeClient() {
  const httpLink = new HttpLink({
    // https://studio.apollographql.com/public/spacex-l4uc6p/
    uri: "/api/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApolloNextAppProvider
          makeClient={makeClient}
          makeSuspenseCache={makeSuspenseCache}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ApolloNextAppProvider>
      </QueryClientProvider>
    </Provider>
  );
}
