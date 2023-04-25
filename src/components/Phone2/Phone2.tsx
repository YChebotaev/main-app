import { type FC } from "react";
import { useController, type Control } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { Control as ControlComponent } from "../Control";
import { Label } from "../Label";
import { ErrorText } from "../ErrorText";

import classes from "./Phone2.module.css";
import "react-phone-input-2/lib/style.css";

export const Phone2: FC<{ control: Control }> = ({ control }) => {
  const { field, fieldState } = useController({
    control,
    name: "phoneNumber",
    rules: { required: true },
  });

  return (
    <ControlComponent>
      <Label>Ваш номер телефона</Label>
      <PhoneInput
        enableAreaCodes
        country="ru"
        value={field.value}
        onChange={field.onChange}
        inputProps={{
          name: field.name,
          ref: field.ref,
          onBlur: field.onBlur,
        }}
        containerClass={classes.container}
        inputClass={classes.input}
        buttonClass={classes.button}
        dropdownClass={classes.dropdown}
        searchClass={classes.search}
      />
      {fieldState.invalid && <ErrorText>{fieldState.error?.message}</ErrorText>}
    </ControlComponent>
  );
};
