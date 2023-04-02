import { type FC, type CSSProperties } from "react";
import cn from "classnames";

import classes from "./Spinner.module.css";

export const Spinner: FC<{ className?: string; style?: CSSProperties }> = ({
  className,
  style,
}) => (
  <div className={cn(classes.spinner, className)} style={style}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
