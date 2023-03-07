import { type FC } from "react";
import cn from "classnames";

import classes from "./Arrow.module.css";

export const Arrow: FC<{ isOpen: boolean; highlighted: boolean }> = ({
  isOpen,
  highlighted,
}) => (
  <button
    className={cn(
      classes.arrow,
      highlighted && classes.arrowHighlighted,
      isOpen ? classes.arrowOpened : classes.arrowClosed,
    )}
  />
);
