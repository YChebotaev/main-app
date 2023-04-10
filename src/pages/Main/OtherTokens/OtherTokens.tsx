import { type FC } from "react";

import classes from "./OtherTokens.module.css";
import shieldImg from "../../../assets/images/other-tokens-icon-shield.svg";
import clockImg from "../../../assets/images/other-tokens-icon-clock.svg";
import banknoteImg from "../../../assets/images/other-tokens-icon-banknote.svg";

export const OtherTokens: FC = () => (
  <div className={classes.otherTokens}>
    <div className={classes.title}>
      Токены других популярных криптовалютных систем будут доступны в скором
      времени
    </div>
    <div className={classes.list}>
      <div className={classes.item}>
        <div className={classes.itemIconWrapper}>
          <img className={classes.itemIcon} src={shieldImg} alt="" />
        </div>
        <div className={classes.itemText}>Гарантия выполнения средств</div>
      </div>
      <div className={classes.item}>
        <div className={classes.itemIconWrapper}>
          <img className={classes.itemIcon} src={clockImg} alt="" />
        </div>
        <div className={classes.itemText}>Время зачисления — 30 минут</div>
      </div>
      <div className={classes.item}>
        <div className={classes.itemIconWrapper}>
          <img className={classes.itemIcon} src={banknoteImg} alt="" />
        </div>
        <div className={classes.itemText}>Минимальная сумма — 5.000 руб.</div>
      </div>
    </div>
  </div>
);
