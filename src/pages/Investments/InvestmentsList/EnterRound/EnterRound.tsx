import { type FC } from "react";
import { Button } from "../../../../components/Button";
import { Header } from "../../../../components/Header";

import classes from "./EnterRound.module.css";

export const EnterRound: FC = () => (
  <div className={classes.enterRound}>
    <div className={classes.headerWrapper}>
      <Header level={2}>Что такое ROUND?</Header>
    </div>
    <div className={classes.textWrapper}>
      <div className={classes.text}>
        ROUND -- это нвестиции с заморозкой токена на 6 месяцев, ниже рынка на
        20%. Выгодны на объеме.
      </div>
    </div>
    <div className={classes.advantagesWrapper}>
      <div className={classes.advantages}>
        <div className={classes.advatage}>
          <Header level={3} className={classes.advatageTitle}>
            6 месяцев
          </Header>
          <div className={classes.advatageText}>Срок заморозки инвестиции</div>
        </div>
        <div className={classes.advatage}>
          <Header level={3} className={classes.advatageTitle}>
            на 20% ниже рынка
          </Header>
          <div className={classes.advatageText}>
            Стоимость токена при входе в ROUND
          </div>
        </div>
      </div>
    </div>
    <div className={classes.graphWrapper}>
      <div className={classes.graph}>

      </div>
    </div>
    <div className={classes.buttonWrapper}>
      <Button to="/investments/round" className={classes.button}>Войти в ROUND</Button>
    </div>
  </div>
);
