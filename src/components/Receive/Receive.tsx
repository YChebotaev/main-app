import { type FC } from "react";
import { type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Input } from "../Input";
import { Label } from "../Label";

import classes from "./Receive.module.css";

export const Receive: FC<{ control: Control }> = ({ control }) => (
  <ControlComponent className={classes.receive}>
    <Label>Получу</Label>
    <div className={classes.columns}>
      <div className={classes.left}>
        <Input name="receive" control={control} />
      </div>
      <div className={classes.right}>
        MAIN
      </div>
    </div>
  </ControlComponent>
);
