import { type FC } from "react";

import { Webinar } from "./Webinar";
import { Samopiar } from "./Samopiar";
import { MediaList } from "./MediaList";
import { RatingsList } from "./RatingsList";
import { Page } from "../../components/Page";
import { Header } from "../../components/Header";

import classes from "./Main.module.css";
import { Button } from "../../components/Button";

export const Main: FC = () => (
  <Page className={classes.main}>
    <div className={classes.webinarWrapper}>
      <Webinar />
    </div>
    <div className={classes.samopiarWrapper}>
      <Samopiar />
    </div>
    <div className={classes.buttonWrapper}>
      <Button to="/investments" style={{ fontSize: 18 }}>Инвестировать в MAIN</Button>
    </div>
    <div className={classes.mediaWrapper}>
      <Header>О нас пишут</Header>
      <div className={classes.mediaListWrapper}>
        <MediaList />
      </div>
    </div>
    <div className={classes.ratingsWrapper}>
      <Header>Крипто рейтинги</Header>
      <div className={classes.ratingsListWrapper}>
        <RatingsList />
      </div>
    </div>
  </Page>
);
