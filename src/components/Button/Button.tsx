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
  children: ReactNode;
  onClick?(
    e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
  ): void;
}> = ({ to, target, unstyled, className, style, type, children, onClick }) => {
  if (to) {
    return (
      <Link
        to={to}
        target={target}
        className={cn(!unstyled && classes.button, className)}
        style={style}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={cn(!unstyled && classes.button, className)}
        style={style}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
