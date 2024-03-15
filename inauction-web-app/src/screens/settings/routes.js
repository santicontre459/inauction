import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Settings = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/company_status`}/>
        <Route path={`${match.url}/company_status`} component={asyncComponent(() => import('./company-status'))}/>
        <Route path={`${match.url}/role_settings`} component={asyncComponent(() => import('./role-settings'))}/>
        <Route path={`${match.url}/activities`} component={asyncComponent(() => import('./acticities'))}/>
        <Route path={`${match.url}/event_related_activities`} component={asyncComponent(() => import('./event-related-activities'))}/>
        <Route path={`${match.url}/file_manager`} component={asyncComponent(() => import('./file-manager'))}/>
    </Switch>
);

export default Settings;
