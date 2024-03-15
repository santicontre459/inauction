import React from "react";
import { Route, Switch } from "react-router-dom";
import DataDisplay from "./dataDisplay/routes";
import DataEntry from "./dataEntry/routes";
import Feedback from "./feedback/routes";
import Navigation from "./navigation/routes";
import Others from "./others/routes";
import General from "./general/routes";
import Table from "./table/routes";

const Components = ({match}) => (
  <Switch>
    <Route path={`${match.url}/dataDisplay`} component={DataDisplay}/>
    <Route path={`${match.url}/dataEntry`} component={DataEntry}/>
    <Route path={`${match.url}/feedback`} component={Feedback}/>
    <Route path={`${match.url}/general`} component={General}/>
    <Route path={`${match.url}/navigation`} component={Navigation}/>
    <Route path={`${match.url}/others`} component={Others}/>
    <Route path={`${match.url}/table`} component={Table}/>
  </Switch>
);

export default Components;
