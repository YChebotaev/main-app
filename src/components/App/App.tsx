import { type FC } from "react";
import { Routes, Route, useLocation } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Main } from "../../pages/Main";
import { Investments } from "../../pages/Investments";
import { Round } from "../../pages/Round";

import classes from "./App.module.css";

export const App: FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames={{
          appear: classes.appear,
          appearActive: classes.appearActive,
          appearDone: classes.appearDone,
          enter: classes.enter,
          enterActive: classes.enterActive,
          enterDone: classes.enterDone,
          exit: classes.exit,
          exitActive: classes.exitActive,
          exitDone: classes.exitDone,
        }}
        timeout={250}
      >
        <Routes key={location.key} location={location}>
          <Route path="/" element={<Main />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/investments/round" element={<Round />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
