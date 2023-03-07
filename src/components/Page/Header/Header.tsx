import { type FC, type ReactNode } from "react";

import classes from "./Header.module.css";

export const Header: FC<{ logo: ReactNode; backButton: ReactNode }> = ({
  logo,
  backButton,
}) => (
  <div className={classes.header}>
    <div className={classes.logoWrapper}>{logo}</div>
    <div className={classes.backButtonWrapper}>{backButton}</div>
  </div>
);
