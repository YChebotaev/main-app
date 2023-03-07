import { forwardRef, type FC, type ReactNode } from "react";
import cn from "classnames";

import classes from "./Control.module.css";

export const Control = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children: ReactNode;
  }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn(classes.control, className)}>
    {children}
  </div>
));
