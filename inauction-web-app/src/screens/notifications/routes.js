import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Notifications = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/list`}/>
        <Route path={`${match.url}/list`} component={asyncComponent(() => import('./index'))}/>
    </Switch>
);

export default Notifications;
