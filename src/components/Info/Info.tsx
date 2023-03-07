import { type FC, type CSSProperties, type ReactNode } from "react";
import cn from "classnames";

import { Line } from "./Line";

import classes from "./Info.module.css";

type InfoType = FC<{
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> & {
  Line: typeof Line;
};

export const Info: InfoType = ({ className, style, children }) => (
  <div className={cn(classes.info, className)} style={style}>
    {children}
  </div>
);

Info.Line = Line;
