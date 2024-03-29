import React from "react";
import { Route, Switch } from "react-router-dom";
import Amchart from './amchart/routes';
import Recharts from './recharts/routes';

const Charts = ({match}) => (
  <Switch>
    <Route path={`${match.url}/recharts`} component={Recharts}/>
    <Route path={`${match.url}/amchart`} component={Amchart}/>
  </Switch>
);

export default Charts;
