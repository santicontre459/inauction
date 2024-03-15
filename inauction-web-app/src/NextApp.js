import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Geocode from 'react-geocode';
import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore, {history} from "./iNRedux/store";
import "./firebase/firebase";
import App from "./containers/App/index";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import jwt_decode from 'jwt-decode';
import './../src/styles/style.css';
import config from './api/config';

Geocode.setApiKey(config.GOOGLE_MAP_API_KEY);

export const store = configureStore();

// Check for token
if (localStorage.jwtUser) {
  const jwtUser = JSON.parse(localStorage.jwtUser);
  const jwtToken = JSON.parse(localStorage.jwtToken);

  // Set auth token header auth
  setAuthToken(jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(jwtUser));

  // Decode Token
  const decoded = jwt_decode(JSON.parse(localStorage.jwtToken));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}

const NextApp = () =>
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </BrowserRouter>
  </Provider>;

export default NextApp;
