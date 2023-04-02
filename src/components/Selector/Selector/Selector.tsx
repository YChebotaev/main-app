import {
  type ReactNode,
  type CSSProperties,
  type Key,
  useState,
  useMemo,
} from "react";
import { type Control, useController } from "react-hook-form";
import { useSelect, type UseSelectStateChange } from "downshift";
import cn from "classnames";
import { usePopper } from "react-popper";

import classes from "./Selector.module.css";
import { Arrow } from "../Arrow";

export const Selector = <O extends { name: string; value: string }>({
  name,
  control,
  items,
  referenceElement,
  highlighted = false,
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
  className?: string;
  style?: CSSProperties;
  getItemLabel(item: O): ReactNode;
  getItemKey(item: O): Key;
  renderItem(item: O): ReactNode;
}) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: items ? items : [],
    selectedItem: value,
    onSelectedItemChange({ selectedItem }: UseSelectStateChange<O>) {
      onChange(selectedItem);
    },
  });

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "absolute",
    placement: "bottom-start",
  });
  const menu = useMemo(() => {
    const menuProps = getMenuProps();

    return (
      <div
        style={styles.popper}
        className={cn(classes.menu, isOpen && classes.menuOpened)}
        {...attributes.popper}
        {...menuProps}
        ref={(el) => {
          menuProps.ref(el);
          setPopperElement(el);
        }}
      >
        <div className={classes.menuWrapper}>
          {items?.map((item, index) => (
            <div
              key={getItemKey(item)}
              className={cn(
                classes.menuItem,
                highlightedIndex === index && classes.menuItemActive,
              )}
              {...getItemProps({ item, index })}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }, [
    isOpen,
    highlightedIndex,
    items,
    styles,
    attributes,
    getMenuProps,
    getItemKey,
    getItemProps,
    renderItem,
    setPopperElement,
  ]);

  return (
    <div className={cn(classes.selector, className)} style={style}>
      <div
        className={cn(
          classes.currentItem,
          highlighted && classes.currentItemHighlighted,
        )}
        {...getToggleButtonProps()}
      >
        <div className={classes.selectedItem}>
          {selectedItem ? getItemLabel(selectedItem) : null}
        </div>
        <Arrow isOpen={isOpen} highlighted={highlighted} />
      </div>
      {menu}
    </div>
  );
};
