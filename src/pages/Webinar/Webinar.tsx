import { type FC } from "react";

import { Page } from "../../components/Page";
import { EventDetails } from '../../components/EventDetails'

import classes from "./Webinar.module.css";

export const Webinar: FC = () => (
  <Page
    withBackButton
    withLogo={false}
    backButton={{ to: "/?back=true" }}
    className={classes.webinar}
  >
    <div className={classes.eventDetailsWrapper}>
      <EventDetails />
    </div>
  </Page>
);
