import styles from "@/app/components/button/commonButton.module.scss";
import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import RippleButton from "../ripple-button";

type Props = React.PropsWithChildren<{
  buttonType?: "primary" | "text" | "tonal" | "outlined" | "blank";
  textType?: "normal" | "icon";
  type?: ButtonHTMLAttributes<unknown>["type"];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  as?: React.ComponentProps<typeof RippleButton>["as"];
}>;

export default function CommonButton({
  buttonType = "primary",
  textType,
  children,
  type = "button",
  className,
  onClick,
  disabled,
  as,
}: Props) {
  return (
    <>
      <RippleButton
        className={classNames(
          styles.button,
          {
            [styles.primary]: buttonType === "primary",
            [styles.textButton]: buttonType === "text",
            [styles.blank]: buttonType === "blank",
            [styles.tonal]: buttonType === "tonal",
            [styles.outlined]: buttonType === "outlined",
            [styles.icon]: textType === "icon",
            [styles.disabled]: disabled === true,
          },
          className,
        )}
        type={type}
        onClick={onClick}
        disabled={disabled}
        as={as}
      >
        {children}
      </RippleButton>
    </>
  );
}
