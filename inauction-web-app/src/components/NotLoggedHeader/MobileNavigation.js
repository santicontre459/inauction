import React , {useState} from 'react';
import { Col, Row, Menu, Layout, Button, Popover, Drawer} from "antd";
import IntlMessages from "util/IntlMessages";
import {Link} from "react-router-dom";
import '@ant-design/compatible/assets/index.css';
import languageData from "../../containers/Topbar/languageData";
import { switchLanguage } from "../../../src/iNRedux/actions/Setting";
import CustomScrollbars from "util/CustomScrollbars";
import { connect } from "react-redux";
import { Form } from '@ant-design/compatible';
import { logoutUser } from "../../redux/actions/authActions";

const MobileNavigation = props => {
const [visible, setVisible] = useState(false);
const showDrawer = () => { setVisible(true); };
const onClose = () => { setVisible(false); };
const {locale, logoutUser, authNew} = props;

const languageMenu = () => (
  <CustomScrollbars className="gx-popover-lang-scroll">
    <ul className="gx-sub-popover">
      {languageData.map(language =>
        <li
          className="gx-media gx-pointer"
          key={JSON.stringify(language)}
          onClick={(e) => props.switchLanguage(language)}
        >
          <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
          <span className="gx-language-text">{language.name}</span>
        </li>
      )}
    </ul>
  </CustomScrollbars>);
  return(
    <div className="app-mobile-version">
      <ul className="gx-header-notifications gx-ml-auto mobile-language">
        <li className="gx-language">
          <Popover
            overlayClassName="gx-popover-horizantal"
            placement="bottomRight"
            content={languageMenu()}
            trigger="click"
          >
            <span className="gx-pointer gx-flex-row gx-align-items-center">
              <i className={`flag flag-24 flag-${locale.icon}`}/>
            </span>
          </Popover>
        </li>
      </ul>
      <i className="gx-icon-btn icon icon-menu" onClick={showDrawer}/>
        <Drawer
          title="Menu"
          className="not-logged-drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <div className="app-menu-collapse">
            {!authNew.isAuthenticated && <Link to="/login">
              <IntlMessages id="header.login"/>
            </Link>}
            {!authNew.isAuthenticated && <Link to="/register">
              <IntlMessages id="header.register"/>
            </Link>}
            {authNew.isAuthenticated && <Link to="/inauction-tool-platform-waiting">
              <IntlMessages id="header.dashboard"/>
            </Link>}
            {authNew.isAuthenticated && <a onClick={logoutUser}>
              <IntlMessages id="header.logout"/>
            </a>}

          </div>
        </Drawer>
    </div>
  )
};

const WrappedNormalLoginForm = Form.create()(MobileNavigation);

const mapStateToProps = ({settings, authNew}) => {
  const {locale} = settings;
  return {locale, authNew}
};

export default connect(mapStateToProps, {
  switchLanguage,
  logoutUser,
})(WrappedNormalLoginForm);
