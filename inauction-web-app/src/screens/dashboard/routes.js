import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Dashboard = ({ match }) => (
    <Switch>
        <Redirect exact from={`/`} to={`${match.url}`}/>
        <Route path={`${match.url}`} component={asyncComponent(() => import('./index'))}/>
    </Switch>
);

export default Dashboard;
