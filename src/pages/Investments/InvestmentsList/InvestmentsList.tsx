import { type FC } from "react";

// import { EnterRound } from "./EnterRound";
import { BuyToken } from "./BuyToken";
// import { Tabs } from "../../../components/Tabs";

import classes from "./InvestmentsList.module.css";

export const InvestmentsList: FC = () => {
  return (
    <div className={classes.investmentsList}>
      <BuyToken />
      {/* <Tabs
        initialTab="buy-token"
        items={[
          {
            key: "enter-round",
            name: "Вход в ROUND",
            to: "/investments/round",
          },
          {
            key: "buy-token",
            name: "Покупка токена",
            to: "/investments/buy",
          },
        ]}
      >
        {(tabId) => {
          switch (tabId) {
            case "enter-round":
              return <EnterRound />;
            case "buy-token":
              return <BuyToken />;
          }
        }}
      </Tabs> */}
    </div>
  );
};
