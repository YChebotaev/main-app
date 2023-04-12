import { type FC } from "react";

// import { Webinar } from "./Webinar";
// import { Samopiar } from "./Samopiar";
// import { MediaList } from "./MediaList";
// import { RatingsList } from "./RatingsList";
// import { Hero } from "./Hero";
// import { Page } from "../../components/Page";
// import { Header } from "../../components/Header";
import { Head } from "./Head";
import { WhatIsNumma } from "./WhatIsNumma";
import { DarkBlock } from "./DarkBlock";
import { BuyToken } from "./BuyToken";
import { Events } from "./Events";
import { OtherTokens } from './OtherTokens'
import { Footer } from './Footer'
import { useTelegramUser } from '../../hooks'

import classes from "./Main.module.css";
// import { Button } from "../../components/Button";

export const Main: FC = () => {
  const user = useTelegramUser()

  return (
    <div className={classes.main}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{window.location.href}</pre>

      <Head />
      <WhatIsNumma />
      <DarkBlock style={{ paddingBottom: 20 }}>
        <BuyToken />
        <Events />
      </DarkBlock>
      <OtherTokens />
      <Footer />
      {/* <div className={classes.webinarWrapper}>
        <Webinar />
      </div> */}
      {/* <div className={classes.samopiarWrapper}>
        <Samopiar />
      </div> */}
      {/* <div className={classes.buttonWrapper}>
        <Button to="/investments" style={{ fontSize: 18 }}>Инвестировать в MAIN</Button>
      </div> */}
      {/* <div className={classes.heroWrapper}>
        <Hero />
      </div>
      <div className={classes.webinarContainerWrapper}>
        <Header>Мероприятия MAIN</Header>
        <div className={classes.webinarWrapper}>
          <Webinar />
        </div>
      </div>
      <div className={classes.mediaWrapper}>
        <Header>О MAIN пишут</Header>
        <div className={classes.mediaListWrapper}>
          <MediaList />
        </div>
      </div>
      <div className={classes.ratingsWrapper}>
        <Header>Крипто рейтинги</Header>
        <div className={classes.ratingsListWrapper}>
          <RatingsList />
        </div>
      </div> */}
    </div>
  )
};
