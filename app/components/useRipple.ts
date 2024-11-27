"use client";

import classNames from "classnames";
import { useState } from "react";
import { surfaceColoring } from "../styles/coloring";
import { conditionalStyles } from "../utils/conditionalStyles";
import styles from "./ripple.module.scss";

type ClickEvent = {
  clientX: number;
  clientY: number;
  currentTarget: React.MouseEvent<HTMLElement>["currentTarget"];
};

export function useRipple(
  params: {
    rippleDuration?: number;
    disabled?: boolean;
    withElevation?: boolean;
  } = {},
) {
  const rippleDuration = params.rippleDuration ?? 600;

  const [ripplePos, setRipplePos] = useState<{
    x: number;
    y: number;
    diameter: number;
    startedAt: Date;
  } | null>(null);

  const [calming, setCalming] = useState<{
    diameter: number;
  } | null>(null);

  function calculateRipple(e: ClickEvent) {
    if (ripplePos !== null || params.disabled) return;
    setCalming(null);
    setCalming(ripplePos);
    let offsetX = e.currentTarget.offsetLeft;
    let offsetY = e.currentTarget.offsetTop;
    let element = e.currentTarget.offsetParent;
    while (element !== null) {
      if (!(element instanceof HTMLElement)) break;

      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
      element = element.offsetParent;
    }

    const diameter = Math.max(
      e.currentTarget.clientWidth,
      e.currentTarget.clientHeight,
    );
    const radius = diameter / 2;
    setRipplePos({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left - radius,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top - radius,

      diameter,
      startedAt: new Date(),
    });
  }

  function finishRipple() {
    if (ripplePos === null) return;
    const oldRipple = ripplePos;

    setTimeout(
      () => {
        const ripple = ripplePos;
        if (oldRipple !== ripple) return;

        setRipplePos(null);
        calmDown({ diameter: ripple!.diameter });
      },
      rippleDuration -
        new Date().getTime() +
        ripplePos!.startedAt.getTime() -
        100,
    );
  }

  function calmDown(params: typeof calming) {
    setCalming(params);
    setTimeout(() => {
      setCalming(null);
    }, 400);
  }

  return {
    buttonData: {
      className: classNames(styles.rippleButton, {
        [styles.rippleButtonSurfaceVars]: params.withElevation !== false,
        [surfaceColoring.surfaceColoring]: params.withElevation !== false,
      }),
      disabled: params.disabled,
      onMouseDown: (e: React.MouseEvent<HTMLElement>) => calculateRipple(e),
      onMouseUp: () => finishRipple(),
      onMouseOut: () => finishRipple(),
      onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
        calculateRipple({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
          currentTarget: e.currentTarget,
        });
      },
      onTouchEnd: () => {
        finishRipple();
      },
      onTouchCancel: () => finishRipple(),
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
            opacity: 0.13,
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
        ],
      ),
    },
  };
}
