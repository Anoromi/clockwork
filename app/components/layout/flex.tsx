"use client";

import { NormalElement } from "@/app/utils/elementTypes";
import React, { JSXElementConstructor } from "react";

type Props = React.PropsWithChildren<{
  flexDirection?: React.CSSProperties["flexDirection"];
  rowGap?: React.CSSProperties["rowGap"];
  columnGap?: React.CSSProperties["columnGap"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  //padding?: React.CSSProperties["padding"];
  paddingLeft?: React.CSSProperties["paddingLeft"];
  paddingRight?: React.CSSProperties["paddingRight"];
  paddingTop?: React.CSSProperties["paddingTop"];
  paddingBottom?: React.CSSProperties["paddingBottom"];
  className?: string;
}>;

export default function Flex<
  T extends NormalElement | JSXElementConstructor<any> = "div",
>(props: Props & { as?: T } & { innerParams?: React.ComponentProps<T> }) {
  const {
    children,
    flexDirection,
    rowGap,
    columnGap,
    justifyContent,
    alignItems,
    //padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    className,
    as = "div",
  } = props;

  const Element = as;
  return (
    <Element
      style={{
        display: "flex",
        flexDirection,
        rowGap,
        columnGap,
        justifyContent,
        alignItems,
        //padding,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
      }}
      className={className}
      {...(props.innerParams ?? {})}
    >
      {children}
    </Element>
  );
}
