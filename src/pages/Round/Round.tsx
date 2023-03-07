import { type FC } from "react";

import { Transfer } from "./Transfer";
import { Cash } from "./Cash";
import { Crypto } from "./Crypto";
import { About } from "../../components/About";
import { Page } from "../../components/Page";
import { Header } from "../../components/Header";

import classes from "./Round.module.css";
import { Tabs } from "../../components/Tabs";

export const Round: FC = () => (
  <Page
    withBackButton
    backButton={{ to: "/investments" }}
    className={classes.round}
  >
    <div className={classes.aboutWrapper}>
      <About />
    </div>
    <div className={classes.tabs}>
      <Header>Вход в ROUND</Header>
      <div className={classes.tabsWrapper}>
        <Tabs
          initialTab="transfer"
          items={[
            {
              key: "transfer",
              name: "Перевод",
            },
            {
              key: "cash",
              name: "Наличные",
            },
            {
              key: "crypto",
              name: "Крипто",
            },
          ]}
        >
          {(tabId) => {
            switch (tabId) {
              case "transfer":
                return <Transfer />;
              case "cash":
                return <Cash />;
              case "crypto":
                return <Crypto />;
            }
          }}
        </Tabs>
      </div>
    </div>
    <div className={classes.roundBlockWrapper}>
      <div className={classes.roundBlock}>
        <Header level={2} className={classes.header}>
          ROUND
        </Header>
        <div className={classes.roundText}>
          Инвестиции с заморозкой токена на 6 месяцев, ниже рынка на 20%.
          Выгодны на объеме.
        </div>
        <div className={classes.roundAdvantages}>
          <div className={classes.roundAdvantage}>
            <Header level={3} className={classes.advantageHeader}>
              6 месяцев
            </Header>
            <div className={classes.advantageText}>
              Срок заморозки инвестиции
            </div>
          </div>
          <div className={classes.roundAdvantage}>
            <Header level={3} className={classes.advantageHeader}>
              на 20% ниже рынка
            </Header>
            <div className={classes.advantageText}>
              Стоимость токена при входе в ROUND
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.graphWrapper}>
      <div className={classes.graph} />
    </div>
    <div className={classes.processBlockWrapper}>
      <Header level={2} className={classes.header}>Процесс входа в ROUND</Header>
      <div className={classes.processBlock}>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>01/</div>
          <div className={classes.processText}>Вы привязываете в боте свой крипто-кошелек</div>
        </div>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>02/</div>
          <div className={classes.processText}>Совершаете перевод в удобном вам формате</div>
        </div>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>03/</div>
          <div className={classes.processText}>Мы фиксируем за вами сумму токенов на вашу сумму инвестиций в момент сделки</div>
        </div>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>04/</div>
          <div className={classes.processText}>Токен упадёт вам в кошелек ровно через 6 месяцев</div>
        </div>
      </div>
    </div>
    <div className={classes.faqBlockWrapper}>
      <Header level={2} className={classes.header}>FAQ</Header>
      <div className={classes.faqBlock}>
        <div className={classes.faqItem}>
          <Header level={3} className={classes.faqTitle}>Как сделать свой криптокошелек?</Header>
          <div className={classes.faqText}>Мы предоставим видеоинструкцию по тому, как его сделать</div>
        </div>
        <div className={classes.faqItem}>
          <Header level={3} className={classes.faqTitle}>Вы меня не забудете?</Header>
          <div className={classes.faqText}>Ваш уникальный идентификатор это ваш кошелек, мы проверим его перед тем как его привязать и планировать на него вашу инвестицию</div>
        </div>
      </div>
    </div>
  </Page>
);
