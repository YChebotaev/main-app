import { type FC } from "react";

import { Button } from "../../../components/Button";

import classes from "./Webinar.module.css";

export const Webinar: FC = () => (
  <div className={classes.webinar}>
    <div className={classes.usersListWrapper}>
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
    <div className={classes.timingListWrapper}>
      <div className={classes.timingList}>
        <div className={classes.timing}>
          <div className={classes.timingHeader}>
            <div className={classes.timingTime}>10.03</div>
            <div className={classes.timingDescr}>Онлайн-встреча инвесторов</div>
          </div>
          <div className={classes.timingTitle}>
            MAIN — это Фейсбук будущего Что ждет Web3.0 в ближайшей перспективе?
          </div>
        </div>
      </div>
    </div>
    <div className={classes.buttonWrapper}>
      <Button>Буду участвовать</Button>
    </div>
  </div>
);
