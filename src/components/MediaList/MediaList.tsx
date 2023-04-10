import { type FC } from "react";
import cn from "classnames";

import classes from "./MediaList.module.css";

export const MediaList: FC = () => (
  <div className={classes.mediaListWrapper}>
    <div className={classes.mediaList}>
      <div className={classes.item}>
        <div className={classes.itemLogoWrapper}>
          <div className={cn(classes.itemLogo, classes.itemLogo1)} />
        </div>
        <div className={classes.itemTextWrapper}>
          <div className={classes.itemText}>
            SocialFi проекты получают $300 млрд инвестиций в 2023
          </div>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.itemLogoWrapper}>
          <div className={cn(classes.itemLogo, classes.itemLogo2)} />
        </div>
        <div className={classes.itemTextWrapper}>
          <div className={classes.itemText}>
            SocialFi проекты получают $300 млрд инвестиций в 2023
          </div>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.itemTextWrapper}>
          <div className={classes.itemText}>
            SocialFi проекты получают $300 млрд инвестиций в 2023
          </div>
        </div>
      </div>
    </div>
  </div>
);
