import { type FC } from "react";
import { type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Input } from "../Input";
import { Label } from "../Label";

import classes from "./Receive.module.css";

export const Receive: FC<{ isLoading?: boolean; control: Control }> = ({
  isLoading = false,
  control,
}) => (
  <ControlComponent className={classes.receive}>
    <Label>Получу</Label>
    <div className={classes.columns}>
      <div className={classes.left}>
        <Input
          readonly
          isLoading={isLoading}
          type="number"
          name="getMoney"
          control={control}
        />
      </div>
      <div className={classes.right}>MAIN</div>
    </div>
  </ControlComponent>
);
