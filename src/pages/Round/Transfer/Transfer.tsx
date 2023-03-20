import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Amount } from "../../../components/Amount";
import { Bank } from "../../../components/Bank";
import { Receive } from "../../../components/Receive";
import { Phone } from "../../../components/Phone";
import { Info } from "../../../components/Info";
import { Appendum } from "../../../components/Appendum";
import { Button } from "../../../components/Button";

import classes from "./Transfer.module.css";

export const Transfer: FC = () => {
  const { control } = useForm();

  return (
    <div className={classes.transfer}>
      <div className={classes.amountWrapper}>
        <Amount control={control} />
      </div>
      <div className={classes.bankWrapper}>
        <Bank control={control} />
      </div>
      <div className={classes.receiveWrapper}>
        <Receive control={control} />
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
          <Info.Line colored>
            <b>
              При входе в ROUND на эту сумму вы получите 95877 MAIN (
              <span style={{ color: "green" }}>+20%</span>)
            </b>
          </Info.Line>
        </Info>
      </div>
      <div className={classes.detailsLinkWrapper}>
        <a href="/" className={classes.detailsLink}>
          Подробнее
        </a>
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
