import { type FC } from "react";

import { Header } from "../../../../components/Header";
import { Button } from "../../../../components/Button";
import graphExample from "../../../../assets/images/graph-example.svg";

import classes from "./BuyToken.module.css";

export const BuyToken: FC = () => (
  <div className={classes.buyToken}>
    <div className={classes.headerWrapper}>
      <Header level={2}>Купить токен по рыночной цене</Header>
    </div>
    <div className={classes.textWrapper}>
      <div className={classes.text}>
        Покупка токена с ценой по рынку, доступны на вашем кошельке сразу после
        получения.
      </div>
    </div>
    <div className={classes.graphWrapper}>
      <img className={classes.graph} src={graphExample} alt="" />
    </div>
    <div className={classes.buttonWrapper}>
      <Button className={classes.button}>Купить токен</Button>
    </div>
  </div>
);
