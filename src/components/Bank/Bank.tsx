import { type FC, useState } from "react";
import { type Control } from "react-hook-form";
import { useQuery } from "react-query";

import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { Selector } from "../Selector";
import { useApiClient } from "../../hooks";

import classes from "./Bank.module.css";

const BANKS = [
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

export const Bank: FC<{ control: Control }> = ({ control }) => {
  const apiClient = useApiClient();
  const { data, isLoading } = useQuery(
    ["currency_exchange", "currency_exchanges"],
    async () => {
      const data = await apiClient.numma.currencyExchange.currencyExchanges();

      return data;
    },
    {
      select({ from_trade_methods }) {
        return from_trade_methods.map(
          ({ trade_method, trade_method_name }) => ({
            value: trade_method,
            name: trade_method_name,
          }),
        );
      },
    },
  );

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <ControlComponent ref={setReferenceElement} className={classes.bank}>
      <Label>Банк отправителя</Label>
      <div className={classes.selectorWrapper}>
        <Selector
          name="bank"
          control={control}
          isLoading={isLoading}
          items={data!}
          referenceElement={referenceElement}
          getItemLabel={({ name }) => name}
          getItemKey={({ value }) => value}
          renderItem={({ name }) => (
            <span className={classes.option}>{name}</span>
          )}
        />
      </div>
    </ControlComponent>
  );
};
