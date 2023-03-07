import { useState, type FC } from "react";
import { type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { Input } from "../Input";
import { Selector } from "../Selector";

import classes from "./Amount.module.css";

const CURRENCIES = [
  {
    value: "KZT",
    name: "Казахский тенге",
  },
  {
    value: "TRY",
    name: "Турецкая лира",
  },
  {
    value: "EUR",
    name: "Евро",
  },
  {
    value: "USD",
    name: "Доллар США",
  },
  {
    value: "AED",
    name: "Дихрам ОАЭ",
  },
  {
    value: "RUB",
    name: "Российский рубль",
  },
];

export const Amount: FC<{ control: Control }> = ({ control }) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <ControlComponent ref={setReferenceElement} className={classes.amount}>
      <Label>Хочу отправить</Label>
      <div className={classes.columns}>
        <div className={classes.left}>
          <Input name="amount" control={control} />
        </div>
        <div className={classes.right}>
          <Selector
            highlighted
            name="currency"
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
