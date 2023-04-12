import { type FC } from "react";
import { Routes, Route, useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Main } from "../../pages/Main";
import { Investments } from "../../pages/Investments";
import { Buy } from "../../pages/Buy";
import { Webinar } from '../../pages/Webinar'
import { BindWallet } from '../../pages/BindWallet'

import classes from "./App.module.css";

export const App: FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isBackNavigate = searchParams.get("back") === "true";

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames={{
          appear: isBackNavigate ? classes.appearBack : classes.appear,
          appearActive: isBackNavigate
            ? classes.appearActiveBack
            : classes.appearActive,
          appearDone: isBackNavigate
            ? classes.appearDoneBack
            : classes.appearDone,
          enter: isBackNavigate ? classes.enterBack : classes.enter,
          enterActive: isBackNavigate
            ? classes.enterActiveBack
            : classes.enterActive,
          enterDone: isBackNavigate ? classes.enterDoneBack : classes.enterDone,
          exit: isBackNavigate ? classes.exitBack : classes.exit,
          exitActive: isBackNavigate
            ? classes.exitActiveBack
            : classes.exitActive,
          exitDone: isBackNavigate ? classes.exitDoneBack : classes.exitDone,
        }}
        timeout={250}
      >
        <Routes key={location.key} location={location}>
          <Route path="/" element={<Main />} />
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/investments/buy" element={<Buy />} />
          <Route path="/bind_wallet" element={<BindWallet />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
