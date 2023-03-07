import { type CSSProperties, type FC, type ReactNode } from "react";
import cn from "classnames";

import { Logo } from "./Logo";
import { Header } from "./Header";
import { BackButton, Props as BackButtonProps } from "./BackButton";

import classes from "./Page.module.css";

export const Page: FC<{
  withLogo?: boolean;
  withBackButton?: boolean;
  backButton?: BackButtonProps;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> = ({
  withLogo = true,
  withBackButton = false,
  backButton,
  className,
  style,
  children,
}) => (
  <div className={cn(classes.page, className)} style={style}>
    {withLogo && !withBackButton && (
      <div className={classes.logoWrapper}>
        <Logo />
      </div>
    )}
    {withLogo && withBackButton && (
      <Header
        logo={<Logo />}
        backButton={
          backButton ? <BackButton {...backButton} /> : <BackButton />
        }
      />
    )}
    {children}
  </div>
);
