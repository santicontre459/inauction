import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const UserData = ({ match }) => (
  <Switch>
    {/*<Redirect exact from={`${match.url}/`} to={`${match.url}/contacts`}/>*/}
    <Redirect exact from={`${match.url}/`} to={`${match.url}/wall`}/>
    <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./profile'))}/>
    <Route path={`${match.url}/change-password`} component={asyncComponent(() => import('./change-password'))}/>

  </Switch>
);

export default UserData;
