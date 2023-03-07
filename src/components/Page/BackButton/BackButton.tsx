import { type FC } from "react";
import { Button } from "../../Button";

import classes from "./BackButton.module.css";

export type Props = {
  to?: string;
};

export const BackButton: FC<Props> = ({ to }) => (
  <Button unstyled to={to} className={classes.backButton}>
    <div className={classes.backIcon} />
  </Button>
);
