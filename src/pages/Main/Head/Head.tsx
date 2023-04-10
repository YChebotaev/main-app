import { type FC } from "react";

import classes from "./Head.module.css";

export const Head: FC = () => (
  <div className={classes.head}>
    <div className={classes.logo} />
    <div className={classes.title}>Переводы онлайн по всеми миру</div>
    <div className={classes.subtitle}>Быстро. Просто. Безопасно</div>
  </div>
);
