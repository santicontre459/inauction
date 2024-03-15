import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Button, Popover } from "antd";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import languageData from "../../containers/Topbar/languageData";
import { switchLanguage } from "../../../src/iNRedux/actions/Setting";
import { isAdmin, isBidder, isExpert, isHost} from '../../util/common';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

  constructor(props) {
    super(props);
    this.state = { localeVisible: false };
  }

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
 
  render() {
    const { themeType, navStyle, location } = this.props;
    const { pathname } = location;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];


    console.log(pathname, selectedKeys, defaultOpenKeys)

    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile user={this.props.authNew.user} />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              {/* Dashboard & Analytics */}
              <MenuItemGroup
                key="main"
                className="gx-menu-group"
                title={<IntlMessages id="sidebar.main" />}
              >
                <Menu.Item key="dashboard">
                  <Link to="/dashboard">
                    <i
                      className="icon icon-data-display sidebar-custom-icon sidebar-custom-icon-dashboard"
                    />
                    <IntlMessages id="sidebar.dashboard" /></Link>
                </Menu.Item>
                <Menu.Item key="analytics">
                  <Link to="/analytics"><i
                    className="icon icon-chart-area sidebar-custom-icon" />
                    <IntlMessages id="sidebar.analytics" /></Link>
                </Menu.Item>
              </MenuItemGroup>

              {/* Events */}
              <SubMenu
                key="events"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-ckeditor sidebar-custom-icon" />
                    <IntlMessages id="sidebar.events" />
                  </span>
                }
              >
                {isHost(this.props.authNew.user) &&
                  <Menu.Item key="events/create">
                    <Link to="/events/create">
                      <i className="icon icon-add-circle" />
                      <IntlMessages id="sidebar.events.create" />
                    </Link>
                  </Menu.Item>}
                {isHost(this.props.authNew.user) &&
                  <Menu.Item key="events/draft">
                    <Link to="/events/draft">
                      <i className="icon icon-filter-circle" />
                      <IntlMessages id="sidebar.events.draft" />
                    </Link>
                  </Menu.Item>}
                <Menu.Item key="events/all">
                  <Link to="/events">
                    <i className="icon icon-select" />
                    <IntlMessages id="sidebar.events.all" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="events/calendar">
                  <Link to="/events/calendar">
                    <i className="icon icon-calendar" />
                    <IntlMessages id="sidebar.events.calendar" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="events/help">
                  <Link to="/events/help">
                    <i className="icon icon-tag-o" />
                    <IntlMessages id="sidebar.events.help" />
                  </Link>
                </Menu.Item>
              </SubMenu>

              {/* Experts & Tasks */}
              {
                (isHost(this.props.authNew.user) || isAdmin(this.props.authNew.user)) &&
                <SubMenu
                  key="users"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={
                    <span>
                      <i className="icon icon-profile sidebar-custom-icon" />
                      <IntlMessages id="sidebar.users" />
                    </span>
                  }
                >
                  <Menu.Item key="experts/all" className="custom-submenu-li">
                    <Link to="/experts/all">
                      <i className="icon icon-auth-screen" />
                      <IntlMessages id="sidebar.users.all" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="experts/create" className="custom-submenu-li">
                    <Link to="/experts/create">
                      <i className="icon icon-add-circle" />
                      <IntlMessages id="sidebar.users.create" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="tasks/manage" className="custom-submenu-tasks-li">
                    <Link to="/tasks/manage">
                      <i className="icon icon-tasks custom-icon-tasks" />
                      <IntlMessages id="sidebar.tasks.manage" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="tasks/create" className="custom-submenu-li">
                    <Link to="/tasks/create">
                      <i className="icon icon-add-circle" />
                      <IntlMessages id="sidebar.tasks.create" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              }

              {/* Bidders List */}
              {isHost(this.props.authNew.user) &&
                <SubMenu
                  key="bidders"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={
                    <span>
                      <i className="icon icon-product-list sidebar-custom-icon" />
                      <IntlMessages id="sidebar.bidders" />
                    </span>
                  }
                >
                  <Menu.Item key="bidders/invitations">
                    <Link to="/bidders/invitations">
                      <i className="icon icon-popconfirm" />
                      <IntlMessages id="sidebar.bidders.list" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="bidders/invite">
                    <Link to="/bidders/invite">
                      <i className="icon icon-navigation" />
                      <IntlMessages id="sidebar.bidders.invite" />
                    </Link>
                  </Menu.Item>
                </SubMenu>}

              {/* Chat */}
              <SubMenu
                key="chat"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-chat-bubble -flex-column-reverse sidebar-custom-icon" />
                    <IntlMessages id="sidebar.chat.index" />
                  </span>
                }
              >
                <Menu.Item key="chat/messages">
                  <Link to="/chat/messages">
                    <i className="icon icon-chat-new" />
                    <IntlMessages id="sidebar.chat.messages" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="chat/notes">
                  <Link to="/chat/notes">
                    <i className="icon icon-copy" />
                    <IntlMessages id="sidebar.chat.notes" />
                  </Link>
                </Menu.Item>
              </SubMenu>

              {/* Settings */}
              <SubMenu
                key="settings"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-components sidebar-custom-icon" />
                    <IntlMessages id="sidebar.settings" />
                  </span>
                }
              >
                <Menu.Item key="settings/company_status">
                  <Link to="/settings/company_status">
                    <i className="icon icon-company" />
                    <IntlMessages id="sidebar.settings.company_status" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings/role_settings">
                  <Link to="/settings/role_settings">
                    <i className="icon icon-avatar" />
                    <IntlMessages id="sidebar.settings.role_settings" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings/file_manager">
                  <Link to="/settings/file_manager">
                    <i className="icon icon-folder-o" />
                    <IntlMessages id="sidebar.settings.file_manager" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings/activities">
                  <Link to="/settings/activities">
                    <i className="icon icon-tickets" />
                    <IntlMessages id="sidebar.settings.activities" />
                  </Link>
                </Menu.Item>
              </SubMenu>

              {/* Feedback */}
              <Menu.Item key="feedback">
                <Link to="/feedback">
                  <i className="icon icon-feedback sidebar-custom-icon" />
                  <IntlMessages id="sidebar.chat.feedback" />
                </Link>
              </Menu.Item>

              <Menu.Item key="nav-header-key4">
                <div className="gx-app-login-container">
                  <ul className="gx-header-notifications gx-ml-auto login-notification">
                    <li className="gx-language">
                      <Popover
                        overlayClassName="gx-popover-horizantal"
                        placement="bottomRight"
                        content={
                          <CustomScrollbars className="gx-popover-lang-scroll">
                            <ul className="gx-sub-popover">
                              {languageData.map(language =>
                                <li
                                  className="gx-media gx-pointer"
                                  key={JSON.stringify(language)}
                                  onClick={(e) => {
                                    this.props.switchLanguage(language);
                                    // setLocaleVisible(false);
                                    this.setState({ localeVisible: false })
                                  }}
                                >
                                  <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
                                  <span className="gx-language-text">{language.name}</span>
                                </li>
                              )}
                            </ul>
                          </CustomScrollbars>
                        }
                        trigger="click"
                        visible={this.state.localeVisible}
                        onVisibleChange={visible => this.setState({ localeVisible: visible })}
                      >
                        <span className="gx-pointer gx-flex-row gx-align-items-center">
                          <i className={`flag flag-24 flag-${this.props.locale.icon}`} />
                        </span>
                      </Popover>
                    </li>
                  </ul>
                </div>
              </Menu.Item>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};

const mapStateToProps = ({ settings, authNew }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  return { navStyle, themeType, locale, pathname, authNew }
};

export default connect(mapStateToProps, { switchLanguage })(withRouter(SidebarContent));

