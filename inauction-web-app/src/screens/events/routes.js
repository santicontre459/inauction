import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Events = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/all`}/>
    <Route path={`${match.url}/all`} component={asyncComponent(() => import('./events-list'))}/>
    <Route path={`${match.url}/calendar`} component={asyncComponent(() => import('./calendar-list'))}/>
    <Route path={`${match.url}/draft`} component={asyncComponent(() => import('./draft-event-list'))}/>
    <Route path={`${match.url}/create`} component={asyncComponent(() => import('./create-event'))}/>
    <Route path={`${match.url}/basic_help`} component={asyncComponent(() => import('./basic-help'))}/>
  </Switch>
);

export default Events;
