import { type FC, type MouseEvent as ReactMouseEvent } from "react";
import cn from "classnames";

import { Backdrop } from "../Backdrop";
import { Button } from "../Button";
import { WalletId } from "../WalletId";

import classes from "./UnbindDialog.module.css";

export const UnbindDialog: FC<{
  address?: string;
  onClickYes?(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void;
  onClickNo?(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void;
}> = ({ address, onClickYes, onClickNo }) => {
  return (
    <Backdrop className={classes.backdrop}>
      <div className={classes.unbindDialog}>
        <div className={classes.title}>
          Вы точно хотите отвязать криптокошелек?
        </div>
        <div className={classes.walletIdWrapper}>
          {address && <WalletId address={address} />}
        </div>
        <div className={classes.buttons}>
          <Button
            className={cn(classes.button, classes.buttonNo)}
            onClick={onClickNo}
          >
            Нет
          </Button>
          <Button
            className={cn(classes.button, classes.buttonYes)}
            onClick={onClickYes}
          >
            Да
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};
