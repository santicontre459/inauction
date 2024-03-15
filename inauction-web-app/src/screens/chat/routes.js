import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Chat = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/messages`}/>
        <Route path={`${match.url}/messages`} component={asyncComponent(() => import('./messages'))}/>
        <Route path={`${match.url}/notes`} component={asyncComponent(() => import('./notes'))}/>
    </Switch>
);

export default Chat;
