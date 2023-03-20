import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Amount } from "../../../components/Amount";
import { Bank } from "../../../components/Bank";
import { Receive } from "../../../components/Receive";
import { City } from "../../../components/City";
import { Phone } from "../../../components/Phone";
import { Info } from "../../../components/Info";
import { Appendum } from "../../../components/Appendum";
import { Button } from "../../../components/Button";

import classes from "./Cash.module.css";

export const Cash: FC = () => {
  const { control } = useForm();

  return (
    <div className={classes.cash}>
      <div className={classes.amountWrapper}>
        <Amount control={control} />
      </div>
      <div className={classes.bankWrapper}>
        <Bank control={control} />
      </div>
      <div className={classes.receiveWrapper}>
        <Receive control={control} />
      </div>
      <div className={classes.cityWrapper}>
        <City control={control} />
      </div>
      <div className={classes.phoneWrapper}>
        <Phone control={control} />
      </div>
      <div className={classes.infoWrapper}>
        <Info>
          <Info.Line>
            <b>Курс</b>
            {"  "}1 RUB = <b>7.99 MAIN</b>
          </Info.Line>
          <Info.Line>Время перевода: 15 мин.</Info.Line>
          <Info.Line colored>
            Курс будет уточнён на момент старта сделки
          </Info.Line>
        </Info>
      </div>
      <div className={classes.buttonWrapper}>
        <Button className={classes.button}>Отправить заявку</Button>
      </div>
      <div className={classes.appendumWrapper}>
        <Appendum />
      </div>
    </div>
  );
};
