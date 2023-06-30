"use client"

import React from "react"
import { Provider } from "react-redux"
import { store } from "./store"
import { QueryClient, QueryClientProvider } from "react-query"
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	SuspenseCache,
} from "@apollo/client"
import {
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"

type Props = React.PropsWithChildren<{}>

const queryClient = new QueryClient()

function makeClient() {
	const httpLink = new HttpLink({
		// https://studio.apollographql.com/public/spacex-l4uc6p/
		uri: "/api/graphql",
	})

	return new ApolloClient({
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
	})
}

function makeSuspenseCache() {
	return new SuspenseCache()
}

export default function Providers({ children }: Props) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ApolloNextAppProvider
					makeClient={makeClient}
					makeSuspenseCache={makeSuspenseCache}
				>
					{children}
				</ApolloNextAppProvider>
			</QueryClientProvider>
		</Provider>
	)
}
