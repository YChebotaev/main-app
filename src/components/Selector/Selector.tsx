import { type ReactNode, type CSSProperties, type Key } from "react";
import { type Control } from "react-hook-form";

import { Selector as SelectorItself } from "./Selector/Selector";
import { Spinner } from '../Spinner'

import classes from "./Selector.module.css";

export const Selector = <O extends { name: string; value: string }>({
  name,
  control,
  items,
  referenceElement,
  highlighted = false,
  isLoading = false,
  className,
  style,
  getItemLabel,
  getItemKey,
  renderItem,
}: {
  name: string;
  control: Control;
  items: O[];
  referenceElement: HTMLDivElement | null;
  highlighted?: boolean;
  isLoading?: boolean;
  className?: string;
  style?: CSSProperties;
  getItemLabel(item: O): ReactNode;
  getItemKey(item: O): Key;
  renderItem(item: O): ReactNode;
}) => {
  if (isLoading) {
    return (
      <div className={classes.selectorLoading}>
        <Spinner />
      </div>
    );
  }

  return (
    <SelectorItself
      name={name}
      control={control}
      items={items}
      referenceElement={referenceElement}
      highlighted={highlighted}
      className={className}
      style={style}
      getItemLabel={getItemLabel}
      getItemKey={getItemKey}
      renderItem={renderItem}
    />
  );
};
