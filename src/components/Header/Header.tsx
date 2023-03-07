import { type CSSProperties, type FC, type ReactNode } from "react";
import cn from "classnames";

import classes from "./Header.module.css";

export const Header: FC<{
  level?: 1 | 2 | 3;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> = ({ level = 1, className, style, children }) => (
  <div
    className={cn(classes.header, classes[`header${level}`], className)}
    style={style}
  >
    {children}
  </div>
);
