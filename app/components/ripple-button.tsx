"use client";

import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";
import { NormalElement } from "../utils/elementTypes";
import { useRipple } from "./useRipple";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  as?: NormalElement;
  type?: ButtonHTMLAttributes<unknown>["type"];
  disabled?: boolean;
};

export default function RippleButton({
  children,
  className,
  onClick,
  as = "button",
  type = "button",
  disabled,
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

  let { buttonData, rippleData } = useRipple({
    disabled,
  });

  const Element = as as NormalElement;
  const extraProps: Record<string, unknown> = {};
  if (as === "button") {
    extraProps.type = type;
    extraProps.onClick = onClick;
  }
  return (
    <Element
      // onMouseDown={(e) => calculateRipple(e)}
      // onMouseUp={(e) => finishRipple()}
      // onMouseOut={(e) => finishRipple()}

      {...buttonData}
      {...extraProps}
      // onClick={calculateRipple}

      className={classNames(buttonData.className, className)}
      //onPointerDown={(e) => {
      //    console.log(e)
      //  }}
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
  );
}
