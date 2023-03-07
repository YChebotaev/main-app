import { type CSSProperties, type FC, type ReactNode } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

export const Button: FC<{
  to?: string;
  unstyled?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?(): void;
}> = ({ to, unstyled, className, style, children, onClick }) => {
  if (to) {
    return (
      <Link
        to={to}
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
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
