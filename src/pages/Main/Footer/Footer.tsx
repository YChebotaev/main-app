import { type FC } from "react";

import classes from "./Footer.module.css";
import nummaLogo from "../../../assets/images/appendum-logo-numma.png";

export const Footer: FC = () => (
  <div className={classes.footer}>
    <div className={classes.line1}>
      <a className={classes.line1Link} href="https://numma.org/#it-works">
        Как это работает
      </a>
      <a className={classes.line1Link} href="https://numma.org/#faq">
        FAQ
      </a>
      <a className={classes.line1Link} href="https://numma.org/#reviews">
        Отзывы
      </a>
    </div>
    <div className={classes.line2}>
      SIA «PM Company» Nometņu iela 44-9, Rīga, LV-1002, Latvia
    </div>
    <div className={classes.line3}>
      <div className={classes.line3Left}>
        <a className={classes.line3Link} href="https://numma.org/privacy">
          Политика конфиденциальности
        </a>
        <a className={classes.line3Link} href="https://numma.org/terms">
          Пользовательское соглашение
        </a>
      </div>
      <div className={classes.line3Right}>
        <img className={classes.line3NummaLogo} src={nummaLogo} alt="" />
      </div>
    </div>
  </div>
);
