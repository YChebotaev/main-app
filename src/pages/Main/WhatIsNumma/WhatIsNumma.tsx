import { type FC } from "react";

import classes from "./WhatIsNumma.module.css";

export const WhatIsNumma: FC = () => (
  <div className={classes.whatIsNumma}>
    <div className={classes.title}>Что такое Numma?</div>
    <div className={classes.text}>
      Платформа Numma служит для поиска наиболее выгодной для вас возможности{" "}
      <u>безопасно</u> купить криптовалюту.
    </div>
    <div className={classes.columnsWrapper}>
      <div className={classes.wallet} />
      <div className={classes.columns}>
        <div className={classes.left}>
          <div className={classes.number}>2.345</div>
          <div className={classes.numberText}>платежей мы провели</div>
        </div>
        <div className={classes.right}>
          <div className={classes.number}>2.345</div>
          <div className={classes.numberText}>платежей мы провели</div>
        </div>
      </div>
      <div className={classes.clear} />
    </div>
  </div>
);
