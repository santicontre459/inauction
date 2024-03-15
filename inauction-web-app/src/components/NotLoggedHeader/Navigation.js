import React , {useState} from 'react';
import { Menu, Button, Popover} from "antd";
import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";
import '@ant-design/compatible/assets/index.css';
import languageData from "../../containers/Topbar/languageData";
import { switchLanguage } from "../../../src/iNRedux/actions/Setting";
import CustomScrollbars from "util/CustomScrollbars";
import { connect } from "react-redux";
import { Form } from '@ant-design/compatible';
import { logoutUser } from '../../redux/actions/authActions';

const rootSubmenuKeys = [ 'sub4'];

const Navigation = props => {
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [localeVisible, setLocaleVisible] = useState(false);

const onOpenChange = keys => {
  const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
};

const handleLocaleVisibilityChange = visible => setLocaleVisible(visible);
const {locale, logoutUser, authNew} = props;

const languageMenu = () => (
  <CustomScrollbars className="gx-popover-lang-scroll">
    <ul className="gx-sub-popover">
      {languageData.map(language =>
        <li
          className="gx-media gx-pointer"
          key={JSON.stringify(language)}
          onClick={(e) => {
            props.switchLanguage(language);
            setLocaleVisible(false);
          }}
        >
          <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
          <span className="gx-language-text">{language.name}</span>
        </li>
      )}
    </ul>
  </CustomScrollbars>);

  return(
    <Menu mode="horizontal" openKeys={openKeys} onOpenChange={onOpenChange}>
      {authNew.isAuthenticated &&
      <Menu.Item key="nav-header-key0">
        <Link to="/inauction-tool-platform-waiting">
          <Button type="primary" className="gx-mb-0">
            <IntlMessages id="header.dashboard"/>
          </Button>
        </Link>
      </Menu.Item>
      }
      {authNew.isAuthenticated &&
        <Menu.Item key="nav-header-key1">
          <Button type="primary-outline" className="gx-mb-0" onClick={logoutUser}>
            <IntlMessages id="header.logout"/>
          </Button>
        </Menu.Item>
      }
      {!authNew.isAuthenticated &&
        <>
          <Menu.Item key="nav-header-key2">
            <Button type="primary" className="gx-mb-0" onClick={() => props.history.push('/login')}>
              <IntlMessages id="header.login"/>
            </Button>
          </Menu.Item>
          <Menu.Item key="nav-header-key3">
            <Button type="primary" className="gx-mb-0" onClick={() => props.history.push('/register')}>
              <IntlMessages id="header.register"/>
            </Button>
          </Menu.Item>
        </>
      }
      <Menu.Item key="nav-header-key4">
        <div className="gx-app-login-container">
          <ul className="gx-header-notifications gx-ml-auto login-notification">
            <li className="gx-language">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={languageMenu()}
                trigger="click"
                visible={localeVisible}
                onVisibleChange={handleLocaleVisibilityChange}
              >
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`}/>
                </span>
              </Popover>
            </li>
          </ul>
        </div>
      </Menu.Item>
    </Menu>
  );
};

const WrappedNormalLoginForm = Form.create()(Navigation);

const mapStateToProps = ({settings, authNew}) => {
  const {locale} = settings;
  return {locale, authNew}
};

export default connect(mapStateToProps, {
  switchLanguage,
  logoutUser,
 })(WrappedNormalLoginForm);
