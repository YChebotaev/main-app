import { type FC } from "react";
import cn from "classnames";

import { Backdrop } from "../Backdrop";
import { Button } from "../Button";
import { WalletId } from "../WalletId";

import classes from "./UnbindDialog.module.css";

export const UnbindDialog: FC<{
  onClickYes?(): void;
  onClickNo?(): void;
}> = ({ onClickYes, onClickNo }) => (
  <Backdrop className={classes.backdrop}>
    <div className={classes.unbindDialog}>
      <div className={classes.title}>
        Вы точно хотите отвязать криптокошелек?
      </div>
      <div className={classes.walletIdWrapper}>
        <WalletId />
      </div>
      <div className={classes.buttons}>
        <Button className={cn(classes.button, classes.buttonNo)} onClick={onClickNo}>Нет</Button>
        <Button className={cn(classes.button, classes.buttonYes)} onClick={onClickYes}>Да</Button>
      </div>
    </div>
  </Backdrop>
);
