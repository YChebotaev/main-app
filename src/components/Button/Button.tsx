import {
  type CSSProperties,
  type FC,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

export const Button: FC<{
  to?: string;
  target?: string;
  unstyled?: boolean;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  onClick?(
    e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
  ): void;
}> = ({
  to,
  target,
  unstyled,
  className,
  style,
  type,
  disabled,
  children,
  onClick,
}) => {
  if (to) {
    return (
      <Link
        to={to}
        target={target}
        aria-disabled={disabled}
        className={cn(!unstyled && classes.button, disabled && classes.disabled, className)}
        style={style}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={cn(!unstyled && classes.button, disabled && classes.disabled, className)}
        style={style}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
