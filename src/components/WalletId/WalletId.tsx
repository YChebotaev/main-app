import { type FC } from "react";

import classes from "./WalletId.module.css";

export const WalletId: FC = () => (
  <div className={classes.walletIdWrapper}>
    <div className={classes.walletIdIcon}></div>
    <div className={classes.walletId}>3fc2e9a9-...240</div>
  </div>
);
