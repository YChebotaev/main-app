import { /*useEffect, useRef */ type FC } from "react";
import { useController, type Control } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { Control as ControlComponent } from "../Control";
import { Label } from '../Label'
// import { Helmet } from "react-helmet";

import classes from "./Phone2.module.css";
import "react-phone-input-2/lib/style.css";

export const Phone2: FC<{ control: Control }> = ({ control }) => {
  const { field } = useController({ control, name: "phoneNumber" });

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
    </ControlComponent>
  );

  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const i = setInterval(() => {
  //     const $ = Reflect.get(window, "$");
  //     const inputEl = inputRef.current;

  //     if (!inputEl) return;

  //     if (typeof $ === "function") {
  //       clearInterval(i);

  //       const $phone = $(inputEl);

  //       $phone.intlTelInput({
  //         autoHideDialCode: false,
  //         autoPlaceholder: "aggressive",
  //         placeholderNumberType: "MOBILE",
  //         preferredCountries: ["ru"],
  //         separateDialCode: true,
  //         nationalMode: true,
  //       });

  //       $phone.on("countrychange", function () {
  //         $phone.inputmask("", { reverse: false });
  //       });

  //       $phone.inputmask("", { reverse: false });
  //     }
  //   }, 100);
  // }, []);

  // return (
  //   <>
  //     <div className={classes.phone2}>
  //       <input ref={inputRef} type="text" inputMode="numeric" />
  //     </div>
  //     <Helmet>
  //       <link
  //         rel="stylesheet"
  //         href="/libraries/intl-tel-input/css/intlTelInput.css"
  //       />
  //       <script src="/libraries/jquery.js" type="text/javascript" />
  //       <script
  //         src="/libraries/intl-tel-input/js/intlTelInput-jquery.js"
  //         type="text/javascript"
  //       />
  //       <script
  //         src="/libraries/intl-tel-input/js/utils.js"
  //         type="text/javascript"
  //       />
  //       <script
  //         src="libraries/inputmask/jquery.inputmask.js"
  //         type="text/javascript"
  //       />
  //     </Helmet>
  //   </>
  // );
};
