import { type FC, type CSSProperties, type ReactNode } from "react";
import cn from "classnames";
import { Title } from "./Title";
import { Content } from "./Content";

import classes from "./Slide.module.css";

type SlideType = FC<{
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> & {
  Title: typeof Title;
  Content: typeof Content;
};

export const Slide: SlideType = ({ className, style, children }) => (
  <div className={cn(classes.slide, className)} style={style}>
    {children}
  </div>
);

Slide.Title = Title;
Slide.Content = Content;
