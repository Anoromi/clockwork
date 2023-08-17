"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type Props = React.PropsWithChildren<{}>;

//function makeClient() {
//  const httpLink = new HttpLink({
//    // https://studio.apollographql.com/public/spacex-l4uc6p/
//    uri: "/api/graphql",
//  });
//
//  return new NextSSRApolloClient({
//    cache: new NextSSRInMemoryCache(),
//    link:
//      typeof window === "undefined"
//        ? ApolloLink.from([
//            new SSRMultipartLink({
//              stripDefer: true,
//            }),
//            httpLink,
//          ])
//        : httpLink,
//  });
//}
//
//function makeSuspenseCache() {
//  return new SuspenseCache();
//}

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      {children}
      {
        //<ApolloNextAppProvider
        //  makeClient={makeClient}
        //  makeSuspenseCache={makeSuspenseCache}
        //></ApolloNextAppProvider>
      }
    </Provider>
  );
}
