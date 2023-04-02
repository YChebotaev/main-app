import { useState, type FC } from "react";
import { type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { Input } from "../Input";
import { Selector } from "../Selector";
import { CURRENCIES } from '../../constants'

import classes from "./Amount.module.css";

export const Amount: FC<{ control: Control }> = ({ control }) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <ControlComponent ref={setReferenceElement} className={classes.amount}>
      <Label>Хочу отправить</Label>
      <div className={classes.columns}>
        <div className={classes.left}>
          <Input name="amountOfMoney" type="number" control={control} />
        </div>
        <div className={classes.right}>
          <Selector
            highlighted
            name="coinType"
            control={control}
            items={CURRENCIES}
            referenceElement={referenceElement}
            getItemLabel={({ value }) => value}
            getItemKey={({ value }) => value}
            renderItem={({ name, value }) => (
              <div className={classes.option}>
                <div className={classes.optionLeft}>
                  <div className={classes.optionCode}>{value}</div>
                </div>
                <div className={classes.optionRight}>
                  <div className={classes.optionName}>{name}</div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </ControlComponent>
  );
};
