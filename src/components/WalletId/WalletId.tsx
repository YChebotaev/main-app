import { type FC } from "react";

import classes from "./WalletId.module.css";

export const WalletId: FC<{ address: string }> = ({ address }) => (
  <div className={classes.walletIdWrapper}>
    <div className={classes.walletIdIcon}></div>
    <div className={classes.walletId}>
      {address.slice(0, 8)}...{address.slice(-4)}
    </div>
  </div>
);
