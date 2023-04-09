import { type FC } from "react";
import { type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Input } from "../Input";
import { Label } from "../Label";

import classes from "./Receive.module.css";

export const Receive: FC<{ control: Control; onBlur?(): void }> = ({
  control,
  onBlur,
}) => (
  <ControlComponent className={classes.receive}>
    <Label>Получу</Label>
    <div className={classes.columns}>
      <div className={classes.left}>
        <Input
          type="number"
          name="getMoney"
          control={control}
          onBlur={onBlur}
        />
      </div>
      <div className={classes.right}>MAIN</div>
    </div>
  </ControlComponent>
);
