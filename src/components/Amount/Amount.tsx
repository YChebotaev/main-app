import { useState, type FC } from "react";
import { useController, type Control } from "react-hook-form";

import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { Input } from "../Input";
import { Selector } from "../Selector";
import { CURRENCIES, CRYPTO_CURRENCIES } from "../../constants";
import { ErrorText } from "../ErrorText";

import classes from "./Amount.module.css";

export const Amount: FC<{
  control: Control;
  isCrypto?: boolean;
  onFocus?(): void;
  onBlur?(): void;
}> = ({ control, isCrypto = false, onFocus, onBlur }) => {
  const { fieldState } = useController({ control, name: "amountOfMoney" });
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <ControlComponent ref={setReferenceElement} className={classes.amount}>
      <Label>Хочу отправить</Label>
      <div className={classes.columns}>
        <div className={classes.left}>
          <Input
            name="amountOfMoney"
            pattern="\d*"
            control={control}
            className={classes.input}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div className={classes.right}>
          <Selector
            highlighted
            name="coinType"
            control={control}
            items={isCrypto ? CRYPTO_CURRENCIES : CURRENCIES}
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
      {fieldState.invalid && <ErrorText>{fieldState.error?.message}</ErrorText>}
    </ControlComponent>
  );
};
