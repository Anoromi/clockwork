"use client"

import { useState } from "react"
import styles from "./ripple.module.scss"
import classNames from "classnames"
import { conditionalStyles } from "../utils/conditionalStyles"

type ClickEvent = {
	clientX: number
	clientY: number
	currentTarget: React.MouseEvent<HTMLElement>["currentTarget"]
}

export function useRipple(rippleDuration: number = 300) {
	const [ripplePos, setRipplePos] = useState<{
		x: number
		y: number
		diameter: number
		startedAt: Date
	} | null>(null)

	const [calming, setCalming] = useState<{
		diameter: number
	} | null>(null)

	console.log("running")

	function calculateRipple(e: ClickEvent) {
		if (ripplePos !== null) return
		setCalming(null)
		setCalming(ripplePos)
		console.log(e.currentTarget.offsetLeft, e.currentTarget.offsetTop)
		console.log(e.currentTarget.clientLeft, e.currentTarget.clientTop)
		console.log(e.clientX, e.clientY)
		let offsetX = e.currentTarget.offsetLeft
		let offsetY = e.currentTarget.offsetTop
		let element = e.currentTarget.offsetParent
		while (element !== null) {
			if (!(element instanceof HTMLElement)) break

			offsetX += element.offsetLeft
			offsetY += element.offsetTop
			element = element.offsetParent
			// console.log(element)
		}

		// console.log()
		// e.currentTarget.client
		const diameter = Math.max(
			e.currentTarget.clientWidth,
			e.currentTarget.clientHeight
		)
		const radius = diameter / 2
		setRipplePos({
			x: e.clientX - (offsetX + radius),
			y: e.clientY - (offsetY + radius),
			diameter,
			startedAt: new Date(),
		})
		// setRippleClicked(true)
	}

	function finishRipple() {
		if (ripplePos === null) return
		const oldRipple = ripplePos

		setTimeout(() => {
			const ripple = ripplePos
			if (oldRipple !== ripple) return

			setRipplePos(null)
			calmDown({ diameter: ripple!.diameter })
		}, rippleDuration - new Date().getTime() + ripplePos!.startedAt.getTime() - 100)
	}

	function calmDown(params: typeof calming) {
		setCalming(params)
		setTimeout(() => {
			setCalming(null)
		}, 400)
	}

	return {
		buttonData: {
			onMouseDown: (e: React.MouseEvent<HTMLElement>) => calculateRipple(e),
			onMouseUp: () => finishRipple(),
			onMouseOut: () => finishRipple(),
			onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
				// e.touches[0].
				calculateRipple({
					clientX: e.touches[0].clientX,
					clientY: e.touches[0].clientY,
					currentTarget: e.currentTarget,
				})
			},
			onTouchEnd: () => {
				finishRipple()
			},
			onTouchCancel: () => finishRipple(),
			className: styles["ripple-button"],
		},
		rippleData: {
			className: classNames(styles.ripple, {
				[styles["ripple-calm"]]: calming,
			}),

			style: conditionalStyles(
				[
					ripplePos !== null,
					() => ({
						// left: ripplePos.x - ripplePos.diameter / 2,
						// top: ripplePos.y - ripplePos.diameter / 2,
						// left: ripplePos.x - ripplePos.diameter / 2,
						// top: ripplePos.y,
						left: `${ripplePos!.x}px`,
						top: `${ripplePos!.y}px`,
						transition: `transform ${rippleDuration}ms linear`,
						opacity: 0.3,
						width: ripplePos!.diameter,
						height: ripplePos!.diameter,
						// transform: "scale(4)",
						// visibility: "visible",
						transform: "scale(2.4)",
					}),
				],
				[
					ripplePos === null && calming === null,
					() => ({
						// transition: "opacity 2000ms linear",
						// opacity: 0,
						opacity: 0,
						transform: "scale(0)",
					}),
				],
				[
					calming !== null,
					() => ({
						width: calming?.diameter,
						height: calming?.diameter,
						// transform: "scale(4)",
						// animation: "calm-down 600ms linear",
						// animationFillMode: "forwards",
						// transition: `opacity 400ms linear`,
						// opacity: 0
						opacity: 0,
					}),
				]
			),
		},
	}
}
