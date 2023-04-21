import { type FC } from "react";

import classes from "./Head.module.css";

export const Head: FC = () => (
  <div className={classes.head}>
    <div className={classes.logoWrapper}>
      <div className={classes.logo} />
      <div className={classes.logoText}>token exchange</div>
    </div>
    <div className={classes.title}>P2P обмен токенов</div>
    <div className={classes.subtitle}>Быстро. Просто. Безопасно</div>
  </div>
);
