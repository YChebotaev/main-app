import { useState, type ReactNode, type Key as ReactKey } from "react";
import cn from "classnames";

import classes from "./Tabs.module.css";

export const Tabs = <Key extends ReactKey>({
  items,
  initialTab,
  children,
}: {
  initialTab?: Key;
  items: {
    key: Key;
    name: string;
    to?: string;
  }[];
  children: (tabId: Key) => ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(initialTab ?? items[0].key);

  return (
    <div className={classes.tabs}>
      <div className={classes.header}>
        {items.map(({ key, name, to }, index) => (
          <button
            key={key}
            className={cn(classes.tab, key === activeTab && classes.tabActive)}
            onClick={() => setActiveTab(key)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={classes.content}>{children(activeTab)}</div>
    </div>
  );
};
