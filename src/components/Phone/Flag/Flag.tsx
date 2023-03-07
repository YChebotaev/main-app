import { type FC, type CSSProperties } from "react";
import cn from "classnames";
import emojiFlags from "emoji-flags";

import classes from "./Flag.module.css";

export const Flag: FC<{
  countryCode: string;
  className?: string;
  style?: CSSProperties;
}> = ({ countryCode, className, style }) => {
  const flagEmoji = emojiFlags.countryCode(countryCode)?.emoji ?? null;

  return (
    <div className={cn(classes.flag, className)} style={style}>
      {flagEmoji}
    </div>
  );
};
