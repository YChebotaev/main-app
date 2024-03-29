import { useState, type FC } from "react";
import { useController, type Control } from "react-hook-form";
import InputMask from "react-input-mask";

import { Flag } from "./Flag";
import { Selector } from "../Selector";
import { Control as ControlComponent } from "../Control";
import ru from "./ru.json";
import rawCountries from "./rawCountries";

import classes from "./Phone.module.css";
import { Label } from "../Label";

// const COUNTRIES = [
//   {
//     name: "Россия",
//     value: "RU",
//     code: "+7",
//   },
//   {
//     name: "США",
//     value: "US",
//     code: "+1",
//   },
// ];

const COUNTRIES = rawCountries.map(
  ([countryName, regions, iso2Code, dialCode]: [
    string,
    string[],
    string,
    string,
  ]) => ({
    name: Reflect.get(ru, iso2Code as string) as string,
    value: (iso2Code as string).toUpperCase(),
    code: `+${dialCode}`,
  }),
) as {
  name: string;
  value: string;
  code: string;
}[];

export const Phone: FC<{ control: Control }> = ({ control }) => {
  const { field } = useController({ control, name: "phoneNumber" });
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  // const [countryCode, setCountryCode] = useState<string>("RU");

  return (
    <ControlComponent ref={setReferenceElement} className={classes.phone}>
      <Label>Ваш номер телефона</Label>
      <div className={classes.columns}>
        <div className={classes.codeWrapper}>
          <Selector
            name="countryCode"
            control={control}
            items={COUNTRIES}
            referenceElement={referenceElement}
            getItemKey={({ value }) => value}
            getItemLabel={({ value, code }) => (
              <div style={{ display: "flex", gap: 4 }}>
                <Flag countryCode={value} />
                <div>{code}</div>
              </div>
            )}
            renderItem={({ name, code }) => (
              <span className={classes.option}>
                {name} ({code})
              </span>
            )}
          />
        </div>
        <div className={classes.phoneWrapper}>
          <InputMask
            alwaysShowMask
            mask="999 999-99-99"
            className={classes.phoneInput}
            {...field}
          />
        </div>
      </div>
    </ControlComponent>
  );
};
