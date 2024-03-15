import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Tasks = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/manage`}/>
    <Route path={`${match.url}/manage`} component={asyncComponent(() => import('./manage-tasks'))}/>
    <Route path={`${match.url}/create`} component={asyncComponent(() => import('./add-edit-task'))}/>
    <Route path={`${match.url}/edit/:id`} component={asyncComponent(() => import('./add-edit-task'))}/>
  </Switch>
);

export default Tasks;
