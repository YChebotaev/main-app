import { type FC } from "react";

import { InvestmentsList } from "./InvestmentsList";
// import { About } from "../../components/About";
import { Page } from "../../components/Page";
import { Header } from "../../components/Header";
import { Profile } from '../../components/Profile'

import classes from "./Investments.module.css";

export const Investments: FC = () => (
  <Page withBackButton backButton={{ to: "/?back=true" }} className={classes.investments}>
    <div className={classes.profileWrapper}>
      <Profile />
    </div>
    <div className={classes.methodsWrapper}>
      <Header>Способы инвестиций</Header>
      <div className={classes.methodsListWrapper}>
        <InvestmentsList />
      </div>
    </div>
  </Page>
);
