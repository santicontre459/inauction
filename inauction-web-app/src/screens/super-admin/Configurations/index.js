import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";

const Configurations = ({match}) => (
  <Switch>
    <Route path={`${match.url}/categories`} component={asyncComponent(() => import('./Categories'))}/>
  </Switch>
);

export default Configurations;
