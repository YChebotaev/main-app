import { type FC, useState } from "react";
import { type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { Selector } from "../Selector";

import classes from "./City.module.css";

const CITIES = [
  {
    value: "sberbank",
    name: "Сбербанк",
  },
  {
    value: "raiffaizen",
    name: "Райффайзен банк",
  },
  {
    value: "qiwi",
    name: "QIWI",
  },
  {
    value: "home-credit",
    name: "Хоум Кредит Банк",
  },
  {
    value: "mts",
    name: "МТС банк",
  },
  {
    value: "tinkoff",
    name: "Тинькофф",
  },
];

export const City: FC<{ control: Control }> = ({ control }) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <ControlComponent ref={setReferenceElement} className={classes.city}>
      <Label>Город</Label>
      <div className={classes.selectorWrapper}>
        <Selector
          name="city"
          control={control}
          items={CITIES}
          referenceElement={referenceElement}
          getItemLabel={({ name }) => name}
          getItemKey={({ value }) => value}
          renderItem={({ name }) => <span className={classes.option}>{name}</span>}
        />
      </div>
    </ControlComponent>
  );
};
