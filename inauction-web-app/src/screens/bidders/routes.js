import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const BiddersInvitations = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/list`}/>
        <Route path={`${match.url}/invitations`} component={asyncComponent(() => import('./bidders-list'))}/>
        <Route path={`${match.url}/invite`} component={asyncComponent(() => import('./invite-bidder'))}/>
    </Switch>
);

export default BiddersInvitations;
