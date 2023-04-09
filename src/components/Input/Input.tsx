import { type CSSProperties, type FC } from "react";
import { useController, type Control } from "react-hook-form";
import cn from "classnames";

import classes from "./Input.module.css";

export const Input: FC<{
  name: string;
  control: Control;
  readonly?: boolean;
  type?: "number" | "text";
  className?: string;
  style?: CSSProperties;
  onBlur?(): void;
}> = ({
  name,
  control,
  readonly = false,
  type = "text",
  className,
  style,
  onBlur,
}) => {
  const { field } = useController({ control, name });

  return (
    <input
      {...field}
      type={type}
      className={cn(classes.input, className)}
      disabled={readonly}
      style={style}
      onChange={(e) => {
        const value = e.target.value;

        if (type === "number") {
          field.onChange(Number(value));
        } else {
          field.onChange(e);
        }
      }}
      onBlur={() => {
        field.onBlur();

        if (typeof onBlur === "function") {
          onBlur();
        }
      }}
    />
  );
};
