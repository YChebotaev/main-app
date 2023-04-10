import { type FC } from "react";
import cn from "classnames";

import classes from "./Samopiar.module.css";

export const Samopiar: FC = () => (
  <div className={classes.samopiar}>
    <div className={classes.line}>
      <div className={classes.iconWrapper}>
        <div className={cn(classes.icon, classes.icon1)} />
      </div>
      <div className={classes.textWrapper}>
        <div className={classes.text}>
          <span className={classes.textHighlight}>Фаундеры создали MDK</span> и
          превратили его в №1 медиа в социальных сетях рунета
        </div>
      </div>
    </div>
    <div className={classes.line}>
      <div className={classes.iconWrapper}>
        <div className={cn(classes.icon, classes.icon2)} />
      </div>
      <div className={classes.textWrapper}>
        <div className={classes.text}>
          <span className={classes.textHighlight}>
            Научили пользователей зарабатывать
          </span>{" "}
          на своём креативе: на 1.7 млн постов MAIN мы выплатили 45 млн наград
        </div>
      </div>
    </div>
    <div className={classes.line}>
      <div className={classes.iconWrapper}>
        <div className={cn(classes.icon, classes.icon3)} />
      </div>
      <div className={classes.textWrapper}>
        <div className={classes.text}>
          <span className={classes.textHighlight}>
            MAIN работает на переднем крае технологий
          </span>{" "}
          блокчейна с 2018 года и использует все преимущества Web3.0 в своём
          продукте
        </div>
      </div>
    </div>
  </div>
);
