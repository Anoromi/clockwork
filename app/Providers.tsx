"use client"

import React from "react"
import { Provider } from "react-redux"
import { store } from "./store"
import { QueryClient, QueryClientProvider } from "react-query"

type Props = React.PropsWithChildren<{}>

const queryClient = new QueryClient()

export default function Providers({ children }: Props) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	)
}
