import { type FC } from "react";

// import graphExample from "../../assets/images/graph-example.svg";
// import { About } from "../../components/About";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { Tabs } from "../../components/Tabs";
// import { Cash } from "./Cash";
import { Crypto } from "./Crypto";
import { Transfer } from "./Transfer";
// import { Profile } from "../../components/Profile";
import { Samopiar } from "../../components/Samopiar";
import { MediaList } from "../../components/MediaList";
import { RatingsList } from "../../components/RatingsList";

import classes from "./Buy.module.css";

export const Buy: FC = () => (
  <Page
    withBackButton
    backButton={{ to: "/?back=true" }}
    className={classes.round}
  >
    {/* <div className={classes.profileWrapper}>
      <Profile />
    </div> */}
    <div className={classes.tabs}>
      <Header>Покупка токена</Header>
      <div className={classes.tabsWrapper}>
        <Tabs
          initialTab="transfer"
          items={[
            {
              key: "transfer",
              name: "Перевод",
            },
            // {
            //   key: "cash",
            //   name: "Наличные",
            // },
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
              // case "cash":
              //   return <Cash />;
              case "crypto":
                return <Crypto />;
            }
          }}
        </Tabs>
      </div>
    </div>
    <div className={classes.block1}>
      <div className={classes.processBlockWrapper}>
        <Header level={2} className={classes.header}>
          Как происходит покупка токена
        </Header>
        <div className={classes.processBlock}>
          <div className={classes.processLine}>
            <div className={classes.processNumber}>01/</div>
            <div className={classes.processText}>
              Вы привязываете в боте свой крипто-кошелек
            </div>
          </div>
          <div className={classes.processLine}>
            <div className={classes.processNumber}>02/</div>
            <div className={classes.processText}>
              Совершаете перевод в удобном вам формате
            </div>
          </div>
          <div className={classes.processLine}>
            <div className={classes.processNumber}>03/</div>
            <div className={classes.processText}>
              Мы фиксируем за вами сумму токенов на вашу сумму инвестиций в
              момент сделки
            </div>
          </div>
          <div className={classes.processLine}>
            <div className={classes.processNumber}>04/</div>
            <div className={classes.processText}>
              Токен упадёт вам в кошелек в течение часа по цене, зафиксированной
              в момент сделки
            </div>
          </div>
        </div>
      </div>
      <div className={classes.samopiarWrapper}>
        <Header className={classes.samopiarHeader}>О токене MAIN</Header>
        <Samopiar />
      </div>
    </div>
    {/* <div className={classes.mediaWrapper}>
      <Header className={classes.mediaHeader}>О MAIN пишут</Header>
      <MediaList />
    </div>
    <div className={classes.ratingsWrapper}>
      <Header className={classes.ratingsHeader}>Крипто рейтинги</Header>
      <RatingsList />
    </div> */}
    {/* <div className={classes.roundBlockWrapper}>
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
    </div> */}
    {/* <div className={classes.graphWrapper}>
      <img src={graphExample} className={classes.graph} alt="" />
    </div> */}
    {/* <div className={classes.processBlockWrapper}>
      <Header level={2} className={classes.header}>
        Процесс входа в ROUND
      </Header>
      <div className={classes.processBlock}>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>01/</div>
          <div className={classes.processText}>
            Вы привязываете в боте свой крипто-кошелек
          </div>
        </div>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>02/</div>
          <div className={classes.processText}>
            Совершаете перевод в удобном вам формате
          </div>
        </div>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>03/</div>
          <div className={classes.processText}>
            Мы фиксируем за вами сумму токенов на вашу сумму инвестиций в момент
            сделки
          </div>
        </div>
        <div className={classes.processLine}>
          <div className={classes.processNumber}>04/</div>
          <div className={classes.processText}>
            Токен упадёт вам в кошелек ровно через 6 месяцев
          </div>
        </div>
      </div>
    </div> */}
    <div className={classes.faqBlockWrapper}>
      <Header level={1} className={classes.header}>
        FAQ
      </Header>
      <div className={classes.faqBlock}>
        <div className={classes.faqItem}>
          <Header level={3} className={classes.faqTitle}>
            Как сделать свой криптокошелек?
          </Header>
          <div className={classes.faqText}>
            Мы предоставим видеоинструкцию по тому, как его сделать
          </div>
        </div>
        <div className={classes.faqItem}>
          <Header level={3} className={classes.faqTitle}>
            Вы меня не забудете?
          </Header>
          <div className={classes.faqText}>
            Ваш уникальный идентификатор это ваш кошелек, мы проверим его перед
            тем как его привязать и планировать на него вашу инвестицию
          </div>
        </div>
      </div>
    </div>
  </Page>
);
