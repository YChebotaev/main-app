import {
  useState,
  Children,
  type FC,
  type CSSProperties,
  type ReactNode,
} from "react";
import cn from "classnames";

import { Slide } from "./Slide";
import { Progress } from "./Progress";

import classes from "./Instruction.module.css";
import { Button } from "../../Button";

type InstructionType = FC<{
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> & {
  Slide: typeof Slide;
};

export const Instruction: InstructionType = ({
  className,
  style,
  children,
}) => {
  const slidesCount = Children.count(children);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const isLastSlide = currentSlide === slidesCount;

  return (
    <div className={cn(classes.instruction, className)} style={style}>
      <div className={classes.title}>Инструкция</div>
      <div className={classes.slideWrapper}>
        {Children.map(children, (child, index) =>
          index === currentSlide ? child : null,
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.footerLeft}>
          <Progress current={currentSlide} total={slidesCount} />
        </div>
        <div className={classes.footerRight}>
          {currentSlide < slidesCount - 1 && (
            <Button
              className={classes.button}
              onClick={(e) => {
                e.preventDefault();

                setCurrentSlide((currentSlide) => currentSlide + 1);
              }}
            >
              Далее
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

Instruction.Slide = Slide;
