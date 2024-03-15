import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Feedback = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/feedback`}/>
        <Route path={`${match.url}/feedback`} component={asyncComponent(() => import('./index'))}/>
    </Switch>
);

export default Feedback;
