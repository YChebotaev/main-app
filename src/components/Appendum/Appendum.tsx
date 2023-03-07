import { type FC } from "react";

import classes from "./Appendum.module.css";

export const Appendum: FC = () => (
  <div className={classes.appendum}>
    <div className={classes.left}>
      <div className={classes.text}>
        Нажимая кнопку, вы соглашаетесь с <a href="/">условиями сервиса</a>
      </div>
    </div>
    <div className={classes.right}>
      <div className={classes.text}>powered by</div>
      <div className={classes.numaLogo} />
    </div>
  </div>
);
