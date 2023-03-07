import { type CSSProperties, type FC } from "react";
import { useController, type Control } from "react-hook-form";
import cn from "classnames";

import classes from "./Input.module.css";

export const Input: FC<{
  name: string;
  control: Control;
  className?: string;
  style?: CSSProperties;
}> = ({ name, control, className, style }) => {
  const { field } = useController({ control, name });

  return (
    <input {...field} className={cn(classes.input, className)} style={style} />
  );
};
