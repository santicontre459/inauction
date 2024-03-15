import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Experts = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/all`}/>
    <Route path={`${match.url}/all`} component={asyncComponent(() => import('./manage-experts'))}/>
    <Route path={`${match.url}/edit/:id`} component={asyncComponent(() => import('./add-edit-expert'))}/>
    <Route path={`${match.url}/create`} component={asyncComponent(() => import('./add-edit-expert'))}/>
  </Switch>
);

export default Experts;
