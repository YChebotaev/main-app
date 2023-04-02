import { type CSSProperties, type FC } from "react";
import { useController, type Control } from "react-hook-form";
import cn from "classnames";

import { Spinner } from "../Spinner";

import classes from "./Input.module.css";

export const Input: FC<{
  name: string;
  control: Control;
  readonly?: boolean
  type?: "number" | "text";
  isLoading?: boolean
  className?: string;
  style?: CSSProperties;
}> = ({ name, control, readonly = false, type = "text", isLoading = false, className, style }) => {
  const { field } = useController({ control, name });

  if (isLoading) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    )
  }

  return (
    <input
      {...field}
      type={type}
      className={cn(classes.input, className)}
      disabled={readonly}
      style={style}
      onChange={(e) => {
        const value = e.target.value

        if (type === 'number') {
          field.onChange(
            Number(value)
          )
        } else {
          field.onChange(e)
        }
      }}
    />
  );
};
