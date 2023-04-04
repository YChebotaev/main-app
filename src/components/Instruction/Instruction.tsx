import { type FC } from "react";

import { Button } from "../Button";

import classes from "./Instruction.module.css";

export const Instruction: FC<{
  onClickYes?(): void;
}> = ({ onClickYes }) => (
  <div className={classes.instruction}>
    <div className={classes.title}>Инструкция</div>
    <div className={classes.text}>У вас уже есть криптокошелёк?</div>
    <div className={classes.footer}>
      <div className={classes.footerLeft}>
        <Button className={classes.noButton}>Нет</Button>
      </div>
      <div className={classes.footerRight}>
        <Button className={classes.yesButton} onClick={onClickYes}>
          Да
        </Button>
      </div>
    </div>
  </div>
);
