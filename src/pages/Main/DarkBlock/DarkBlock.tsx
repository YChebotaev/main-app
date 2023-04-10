import { type CSSProperties, type FC, type ReactNode } from "react";

import classes from "./DarkBlock.module.css";

export const DarkBlock: FC<{
  style?: CSSProperties;
  children: ReactNode;
}> = ({ style, children }) => (
  <div className={classes.darkBlock} style={style}>
    {children}
  </div>
);
