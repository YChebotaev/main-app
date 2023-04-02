import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Amount } from "../../../components/Amount";
import { Receive } from "../../../components/Receive";
import { Info } from "../../../components/Info";
import { CryptoInstruction } from '../../../components/CryptoInstruction'

import classes from "./Crypto.module.css";

export const Crypto: FC = () => {
  const { control } = useForm();

  return (
    <div className={classes.crypto}>
      <div className={classes.amountWrapper}>
        <Amount control={control} />
      </div>
      <div className={classes.receiveWrapper}>
        <Receive control={control} />
      </div>
      <div className={classes.infoWrapper}>
        <Info>
          <Info.Line>
            <b>Курс</b>
            {"  "}1 RUB = <b>7.99 MAIN</b>
          </Info.Line>
          <Info.Line colored>
            Курс будет уточнён на момент старта сделки
          </Info.Line>
        </Info>
      </div>
      <div className={classes.instructionWrapper}>
        <CryptoInstruction />
      </div>
    </div>
  );
};
