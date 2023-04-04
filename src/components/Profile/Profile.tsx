import { useState, type FC } from "react";
import cn from "classnames";

import profileAvatar from "../../assets/images/profile-avatar.jpg";
import { Button } from "../Button";
import { BindingDialog } from "../../components/BindingDialog";
import { UnbindDialog } from "../UnbindDialog";
import { WalletId } from "../WalletId";

import classes from "./Profile.module.css";

export const Profile: FC = () => {
  const walletBound = true;
  const [isBindingModalOpen, setIsBindingModalOpen] = useState(false);
  const [isUnbindModalOpen, setIsUnbindModalOpen] = useState(false);

  if (walletBound) {
    return (
      <>
        <div className={classes.profile}>
          <div className={classes.left}>
            <img
              className={cn(classes.avatar, walletBound && classes.smallAvatar)}
              src={profileAvatar}
              alt=""
            />
          </div>
          <div className={classes.right}>
            <div className={classes.name}>Алексей К.</div>
            <div className={classes.walletInfo}>
              <WalletId />
              <div className={classes.unbindWrapper}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className={classes.unbind}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    setIsUnbindModalOpen(true);
                  }}
                >
                  Отвязать
                </a>
              </div>
            </div>
          </div>
        </div>
        {isUnbindModalOpen && (
          <UnbindDialog
            onClickYes={() => {
              setIsUnbindModalOpen(false);
            }}
            onClickNo={() => {
              setIsUnbindModalOpen(false);
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className={classes.profile}>
          <div className={classes.left}>
            <img className={classes.avatar} src={profileAvatar} alt="" />
          </div>
          <div className={classes.right}>
            <div className={classes.name}>Здравствуйте, Алексей!</div>
            <div className={classes.text}>
              У вас не привязан ни один криптокошелёк
            </div>
            <Button
              className={classes.button}
              onClick={() => setIsBindingModalOpen(true)}
            >
              Привязать кошелёк →
            </Button>
          </div>
        </div>
        {isBindingModalOpen && <BindingDialog />}
      </>
    );
  }
};
