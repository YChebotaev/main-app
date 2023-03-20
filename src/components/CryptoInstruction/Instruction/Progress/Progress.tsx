import { useMemo, type FC } from "react";
import cn from "classnames";

import classes from "./Progress.module.css";

export const Progress: FC<{ current: number; total: number }> = ({
  current,
  total,
}) => {
  const items = useMemo(() => {
    return new Array(total)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className={cn(classes.dot, index === current && classes.activeDot)}
        />
      ));
  }, [total, current]);

  return <div className={classes.progress}>{items}</div>;
};
