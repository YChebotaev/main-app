import { type FC } from "react";

import classes from "./About.module.css";

export const About: FC = () => (
  <div className={classes.about}>
    <div className={classes.text}>Тут можно добавить красивенький текстик</div>
    <div className={classes.icon} />
  </div>
);
