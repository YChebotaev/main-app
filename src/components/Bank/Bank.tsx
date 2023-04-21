import { useState, useRef, type FC, useEffect } from "react";
import { useController, type Control } from "react-hook-form";
import { useQuery } from "react-query";

import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { Selector } from "../Selector";
import { useApiClient } from "../../hooks";

import classes from "./Bank.module.css";

// const BANKS = [
//   {
//     value: "sberbank",
//     name: "Сбербанк",
//   },
//   {
//     value: "raiffaizen",
//     name: "Райффайзен банк",
//   },
//   {
//     value: "qiwi",
//     name: "QIWI",
//   },
//   {
//     value: "home-credit",
//     name: "Хоум Кредит Банк",
//   },
//   {
//     value: "mts",
//     name: "МТС банк",
//   },
//   {
//     value: "tinkoff",
//     name: "Тинькофф",
//   },
// ];

const NAME = "bank";

export const Bank: FC<{
  control: Control;
  fromFiat?: string;
  onChange?(): void;
}> = ({ control, fromFiat, onChange }) => {
  const apiClient = useApiClient();
  const isFirstTimeRender = useRef(true);
  const { field } = useController({ control, name: NAME });
  const { data, isLoading } = useQuery(
    [
      "currency_exchange",
      "currency_exchanges",
      {
        fromFiat,
      },
    ],
    async () => {
      const data = await apiClient.numma.currencyExchange.currencyExchanges({
        fromFiat,
      });

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
      onSuccess(data) {
        if (isFirstTimeRender.current) {
          const firstValue = data[0];

          field.onChange(firstValue);

          Reflect.set(isFirstTimeRender, "current", false);
        }
      },
    },
  );

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading === false) {
      field.onChange(data![0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromFiat, isLoading, data]);

  return (
    <ControlComponent ref={setReferenceElement} className={classes.bank}>
      <Label>Банк отправителя</Label>
      <div className={classes.selectorWrapper}>
        <Selector
          name={NAME}
          control={control}
          items={data!}
          referenceElement={referenceElement}
          getItemLabel={({ name }) => name}
          getItemKey={({ value }) => value}
          renderItem={({ name }) => (
            <span className={classes.option}>{name}</span>
          )}
          currentItemClassName={classes.selectorCurrentItem}
          onChange={onChange}
        />
      </div>
    </ControlComponent>
  );
};
