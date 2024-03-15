import React, { Component } from "react";
import { notification, Layout } from "antd";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";

import Topbar from "../Topbar/index";
import { footerText } from "util/config";
//import App from "../../routes";
import App from "../../screens/routes";
import Customizer from "containers/Customizer";
import {connect} from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import {setupNotifications, removeNotificationListener} from "../../services/notifications";


const {Content, Footer} = Layout;

export class MainApp extends Component {

  componentDidMount () {
    const {id} = JSON.parse(localStorage.jwtUser);
    setupNotifications(id, this.onNotificationReceived);
  }

  componentWillUnmount () {

    // check if user is still logged in
    if (localStorage.jwtUser) {
      const {id} = JSON.parse(localStorage.jwtUser);
      removeNotificationListener(id);
    }

  }

  onNotificationReceived = (notificationData) => {
    const args = {
      message: notificationData.title,
      description: notificationData.message,
      duration: 0,
    };
    notification.open(args);
  };

  getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return '';
    }
  };

  getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL :
        return <HorizontalDefault/>;
      case NAV_STYLE_DARK_HORIZONTAL :
        return <HorizontalDark/>;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
        return <InsideHeader/>;
      case NAV_STYLE_ABOVE_HEADER :
        return <AboveHeader/>;
      case NAV_STYLE_BELOW_HEADER :
        return <BelowHeader/>;
      case NAV_STYLE_FIXED :
        return <Topbar/>;
      case NAV_STYLE_DRAWER :
        return <Topbar/>;
      case NAV_STYLE_MINI_SIDEBAR :
        return <Topbar/>;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
        return <NoHeaderNotification/>;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
        return <NoHeaderNotification/>;
      default :
        return null;
    }
  };

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar/>;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Sidebar/>;
      case NAV_STYLE_DRAWER :
        return <Sidebar/>;
      case NAV_STYLE_MINI_SIDEBAR :
        return <Sidebar/>;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
        return <Sidebar/>;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar/>;
      default :
        // TODO :BEFORE V1 RELEASE (Fix Sidebar not showing on mobile)
        return <Sidebar/>;
    }
  };

  render() {
    const {match, width, navStyle} = this.props;

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content className={`gx-layout-content ${ this.getContainerClass(navStyle)} `}>
            <App match={match}/>
            <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div>
            </Footer>
          </Content>
        </Layout>
        <Customizer/>
      </Layout>
    )
  }
}

const mapStateToProps = ({auth, settings}) => {
  const {width, navStyle} = settings;
  const {authUser} = auth;
  return {authUser, width, navStyle}
};
export default connect(mapStateToProps)(MainApp);

