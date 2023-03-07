import { type FC, type CSSProperties, type ReactNode } from "react";
import cn from "classnames";

import classes from "./Line.module.css";

export const Line: FC<{
  colored?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> = ({ colored = false, className, style, children }) => (
  <div className={cn(classes.line, className)} style={style}>
    <div className={classes.left}>
      <div className={cn(classes.icon, colored && classes.iconColored)} />
    </div>
    <div className={classes.right}>{children}</div>
  </div>
);
