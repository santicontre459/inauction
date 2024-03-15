import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Account from "./account/routes";
import Dashboard from "./dashboard/routes";
import Events from "./events/routes";
import Experts from "./experts/routes";
import Tasks from "./tasks/routes";
import Bidders from "./bidders/routes";
import Chat from "./chat/routes";
import CustomViews from "./custom-views/routes";
import Settings from "./settings/routes";
import Analytics from "./analytics";
import Notifications from "./notifications/routes";
import Feedback from "./feedback/routes";
import Auction from "./auctions/auction";
import HostAuction from "./auctions/host-auction";

import Main from "./main/routes";
import Components from "./components/routes";
import Extensions from "./extensions/routes";
import ExtraComponents from "./extraComponents/routes";
import InBuiltApps from "./in-built-apps/routes";
import Documents from "./documents/routes";
import SuperAdminConfigurations from "./super-admin/Configurations";
import { isAdmin, isHost } from "../util/common";

const checkRestrictRule=(rootType, user)=>{
  if(rootType == 'events' && isHost(user)) {
    return true;
  }
  if(rootType == 'experts' && (isHost(user) || isAdmin(user))) {
    return true;
  }
  if(rootType == 'tasks' && (isHost(user) || isAdmin(user))) {
    return true;
  }
  return false;
}

const RestrictedRoute = ({component: Component, rootType, user, ...rest}) => 
  <Route
    {...rest}
    render={props =>
      checkRestrictRule(rootType, user.user) 
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/dashboard',
            state: {from: props.location}
          }}
        />}
  />;

const App = ({match, authNew}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}account`} component={Account}/>
      <Route path={`${match.url}dashboard`} component={Dashboard}/>
      <RestrictedRoute path={`${match.url}events`} component={Events} rootType='events' user={authNew} />
      <RestrictedRoute path={`${match.url}experts`} component={Experts} rootType='experts' user={authNew} />
      <RestrictedRoute path={`${match.url}tasks`} component={Tasks} rootType='tasks' user={authNew} />
      <Route path={`${match.url}bidders`} component={Bidders}/>
      <Route path={`${match.url}chat`} component={Chat}/>
      <Route path={`${match.url}custom-views`} component={CustomViews}/>
      <Route path={`${match.url}settings`} component={Settings}/>
      <Route path={`${match.url}analytics`} component={Analytics}/>
      <Route path={`${match.url}notifications`} component={Notifications}/>
      <Route path={`${match.url}feedback`} component={Feedback}/>
      <Route path={`${match.url}auction/:id`} component={Auction}/>
      <Route path={`${match.url}host_auction`} component={HostAuction}/>
      
      <Route path={`${match.url}main`} component={Main}/>
      <Route path={`${match.url}components`} component={Components}/>
      <Route path={`${match.url}extensions`} component={Extensions}/>
      <Route path={`${match.url}extra-components`} component={ExtraComponents}/>
      <Route path={`${match.url}in-built-apps`} component={InBuiltApps}/>
      <Route path={`${match.url}documents`} component={Documents}/>
      <Route path={`${match.url}super-admin-configurations`} component={SuperAdminConfigurations}/>
    </Switch>
  </div>
);

const mapStateToProps = ({authNew}) => {
  return {authNew}
};

export default connect(mapStateToProps, null)(App);
