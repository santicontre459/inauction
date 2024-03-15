import React from "react";
import { Route, Switch } from "react-router-dom";
import eCommerce from "./eCommerce/routes";
import ErrorPages from "./errorPages/routes";
import Extras from "./extras/routes";
import ListType from "./listType/routes";
import UserAuth from "./userAuth/routes";

const CustomViews = ({match}) => (
  <Switch>
    {/*<Route path={`${match.url}/eCommerce`} component={eCommerce}/>*/}
    {/*<Route path={`${match.url}/error-pages`} component={ErrorPages}/>*/}
    {/*<Route path={`${match.url}/extras`} component={Extras}/>*/}
    {/*<Route path={`${match.url}/list-type`} component={ListType}/>*/}
    <Route path={`${match.url}/user-auth`} component={UserAuth}/>
  </Switch>
);

export default CustomViews;
