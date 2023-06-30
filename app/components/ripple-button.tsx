"use client"

import React, { ReactElement, useState } from "react"
import styles from "./ripple.module.scss"
import classNames from "classnames"
import { useRipple } from "./useRipple"

type Props = {
	className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	as?: NormalElement
}

export default function RippleButton({
	children,
	className,
	onClick,
	as = "button",
}: React.PropsWithChildren<Props>) {
	// const [rippleClicked, setRippleClicked] = useState(false)
	// const [ripplePos, setRipplePos] = useState<{
	// 	x: number
	// 	y: number
	// 	diameter: number
	// 	startedAt: Date
	// } | null>(null)

	// const [calming, setCalming] = useState<{
	// 	diameter: number
	// } | null>(null)

	// function calculateRipple(e: React.MouseEvent<HTMLElement, MouseEvent>) {
	// 	setCalming(null)
	// 	setCalming(ripplePos)
	// 	const diameter = Math.max(
	// 		e.currentTarget.clientWidth,
	// 		e.currentTarget.clientHeight
	// 	)
	// 	const radius = diameter / 2
	// 	setRipplePos({
	// 		x: e.clientX - (e.currentTarget.offsetLeft + radius),
	// 		y: e.clientY - (e.currentTarget.offsetTop + radius),
	// 		diameter,
	// 		startedAt: new Date(),
	// 	})
	// 	// setRippleClicked(true)
	// }
	// console.log("hehe", className)

	// const rippleDuration = 300
	// function finishRipple() {
	// 	if (ripplePos === null) return
	// 	const oldRipple = ripplePos

	// 	setTimeout(() => {
	// 		const ripple = ripplePos
	// 		if (oldRipple !== ripple) return

	// 		setRipplePos(null)
	// 		calmDown({ diameter: ripple!.diameter })
	// 	}, rippleDuration - new Date().getTime() + ripplePos!.startedAt.getTime() - 100)
	// }

	// function calmDown(params: typeof calming) {
	// 	setCalming(params)
	// 	setTimeout(() => {
	// 		setCalming(null)
	// 	}, 400)
	// }

	let { buttonData, rippleData } = useRipple()

	const Element = as as NormalElement
	const extraProps: Record<string, unknown> = {}
	if (as === "button") {
		extraProps.type = "button"
		extraProps.onClick = onClick
	}
	return (
		<Element
			// onMouseDown={(e) => calculateRipple(e)}
			// onMouseUp={(e) => finishRipple()}
			// onMouseOut={(e) => finishRipple()}

			{...buttonData}
			{...extraProps}
			// onClick={calculateRipple}

			className={classNames(styles["ripple-button"], className)}
		>
			<div
				// className={classNames(styles.ripple, {
				// 	[styles["ripple-calm"]]: calming,
				// })}
				// style={}
				{...rippleData}
			></div>
			{children}
		</Element>
	)
}

type NormalElement = keyof Omit<JSX.IntrinsicElements, SVGS>

type SVGS =
	| "svg"
	| "animate"
	| "animateMotion"
	| "animateTransform"
	| "circle"
	| "clipPath"
	| "defs"
	| "desc"
	| "ellipse"
	| "feBlend"
	| "feColorMatrix"
	| "feComponentTransfer"
	| "feComposite"
	| "feConvolveMatrix"
	| "feDiffuseLighting"
	| "feDisplacementMap"
	| "feDistantLight"
	| "feDropShadow"
	| "feFlood"
	| "feFuncA"
	| "feFuncB"
	| "feFuncG"
	| "feFuncR"
	| "feGaussianBlur"
	| "feImage"
	| "feMerge"
	| "feMergeNode"
	| "feMorphology"
	| "feOffset"
	| "fePointLight"
	| "feSpecularLighting"
	| "feSpotLight"
	| "feTile"
	| "feTurbulence"
	| "filter"
	| "foreignObject"
	| "g"
	| "image"
	| "line"
	| "linearGradient"
	| "marker"
	| "mask"
	| "metadata"
	| "mpath"
	| "path"
	| "pattern"
	| "polygon"
	| "polyline"
	| "radialGradient"
	| "rect"
	| "stop"
	| "switch"
	| "symbol"
	| "text"
	| "textPath"
	| "tspan"
	| "use"
	| "view"
