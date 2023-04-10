import { type FC } from "react";

import classes from "./Events.module.css";
import { Button } from "../../../components/Button";

export const Events: FC = () => (
  <div className={classes.events}>
    <div className={classes.title}>Мероприятия MAIN</div>
    <div className={classes.list}>
      <div className={classes.event}>
        <div className={classes.eventHead}>
          <div className={classes.headLeft}>
            <div className={classes.eventDate}>10 марта в 19:00</div>
          </div>
          <div className={classes.headRight}>
            <div className={classes.eventType}>Онлайн-встреча инвесторов</div>
          </div>
        </div>
        <div className={classes.eventDescription}>
          MAIN — это Фейсбук будущего Что ждет Web3.0 в ближайшей перспективе?
        </div>
        <Button to="/webinar" className={classes.eventButton}>Узнать подробнее</Button>
      </div>
    </div>
  </div>
);
