import React from "react"

type Props = { className: string }

export default function Inh({ className }: Props) {
	return <div className={`${className}`}>Inh hee</div>
}
