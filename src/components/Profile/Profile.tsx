import { type FC } from "react";
import cn from 'classnames'

import profileAvatar from "../../assets/images/profile-avatar.jpg";
import { Button } from "../Button";

import classes from "./Profile.module.css";

export const Profile: FC = () => {
  const walletBound = false;

  if (walletBound) {
    return (
      <div className={classes.profile}>
        <div className={classes.left}>
          <img className={cn(classes.avatar, walletBound && classes.smallAvatar)} src={profileAvatar} alt="" />
        </div>
        <div className={classes.right}>
          <div className={classes.name}>Алексей К.</div>
          <div className={classes.walletInfo}>
            <div className={classes.walletIdWrapper}>
              <div className={classes.walletIdIcon}></div>
              <div className={classes.walletId}>3fc2e9a9-...240</div>
            </div>
            <div className={classes.unbindWrapper}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={classes.unbind} href="#">
                Отвязать
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.profile}>
        <div className={classes.left}>
          <img className={classes.avatar} src={profileAvatar} alt="" />
        </div>
        <div className={classes.right}>
          <div className={classes.name}>Здравствуйте, Алексей!</div>
          <div className={classes.text}>
            У вас не привязан ни один криптокошелёк
          </div>
          <Button className={classes.button}>Привязать кошелёк →</Button>
        </div>
      </div>
    );
  }
};
