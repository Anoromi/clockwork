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
      {...buttonData}
      {...extraProps}
      className={classNames(buttonData.className, className)}
    >
      <div {...rippleData}></div>
      {children}
    </Element>
  );
}
