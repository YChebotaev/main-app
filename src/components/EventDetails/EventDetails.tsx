import { type FC } from "react";

import { Header } from "../../components/Header";

import classes from "./EventDetails.module.css";

export const EventDetails: FC = () => (
  <div className={classes.eventDetails}>
    <div className={classes.title}>
      MAIN — это Фейсбук будущего Что ждет Web3.0 в ближайшей перспективе?
    </div>
    <div className={classes.info}>
      <div className={classes.infoLeft}>10 марта в 19:00</div>
      <div className={classes.infoRight}>Онлайн-встреча инвесторов</div>
    </div>
    <div className={classes.speakersWrapper}>
      <div className={classes.speakersHeader}>Спикеры</div>
      <div className={classes.usersList}>
        <div className={classes.user}>
          <div className={classes.userAvatar} />
          <div className={classes.userName}>Роберто Панчвидзе</div>
        </div>
        <div className={classes.user}>
          <div className={classes.userAvatar} />
          <div className={classes.userName}>Роберто Панчвидзе</div>
        </div>
        <div className={classes.user}>
          <div className={classes.userAvatar} />
          <div className={classes.userName}>Роберто Панчвидзе</div>
        </div>
        <div className={classes.user}>
          <div className={classes.userAvatar} />
          <div className={classes.userName}>Роберто Панчвидзе</div>
        </div>
      </div>
    </div>
    <div className={classes.about}>
      <div className={classes.aboutTitle}>О событии</div>
      <div className={classes.aboutText}>
        Ваш уникальный идентификатор это ваш кошелек, мы проверим его перед тем
        как его привязать и планировать на него вашу инвестицию
      </div>
    </div>
  </div>
);
