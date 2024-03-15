import React from "react";
import {
  Button,
  Input,
  message,
  Layout,
  Form
} from "antd";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, clearErrors } from '../redux/actions/authActions';
import '../styles/login.css';
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./Topbar/languageData";
import { switchLanguage } from "../iNRedux/actions/Setting";
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
} from "iNRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import isEmpty from "../util/isEmpty";
import NotLoggedFooter from "../components/NotLoggedFooter";
import { Helmet } from "react-helmet";
import NotLoggedHeader from "../components/NotLoggedHeader";

const FormItem = Form.Item;
const { Footer, Header} = Layout;

class ResetPassword extends React.Component {

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)} onClick={(e) =>
              this.props.switchLanguage(language)
            }
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>
  );

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser({ email: values.email });
      }
    });
  };

  handleOnError = (error) => {
    if(error){
      setTimeout(() => {
        this.props.clearErrors();
      }, 1000);
      return message.error(this.props.errors.message);
    } else {
      return null;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authNew.isAuthenticated !== prevProps.authNew.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    const {loader, locale} = this.props;

    return (
      <Layout className="gx-app-layout not-logged-in-routes-layout">
        <Helmet>
          <title>Reset Password - iNauction Tool | Procurement Platform</title>
        </Helmet>
        <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader />
        </Header>
        <div className="gx-app-login-wrap gx-app-borderMobile">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content gx-bottom-padding">
              <div className="gx-app-logo-content gx-app-logo-content-login-password-left">
                <div className="gx-app-logo-wid">
                  <h1><IntlMessages id="app.userAuth.resetPassword"/></h1>
                  <span><IntlMessages id="app.userAuth.resetPasswordDetails"/></span>
                </div>
                <div className="gx-app-logo gx-hide-mobileLogo">
                  <img alt="logo_signin" src={require("assets/images/inauction_logo.png")}/>
                </div>
              </div>
              <div className="gx-app-login-content gx-app-logo-content-login-password-right">
                <Form
                  onSubmit={this.handleSubmit}
                  className="gx-signin-form gx-form-row0 not-logged-form"
                  layout="vertical"
                  colon={false}
                  >

                  <FormItem
                    label={<IntlMessages id="appModule.email"/>}
                    name="email"
                    rules={[{ required: true, message: 'The input is not valid E-mail!'}]}
                    className="app-ant4-form"
                  >
                      <Input disabled={true} placeholder="Email" />
                  </FormItem>
                  <FormItem
                    label={<IntlMessages id="appModule.newPassword"/>}
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!'}]}
                    className="app-ant4-form"
                  >
                      <Input type="password" placeholder="New password" type="password"/>
                  </FormItem>
                  <FormItem
                    label={<IntlMessages id="appModule.confirmNewPassword"/>}
                    name="password"
                    rules={[{ required: true, message: 'Please confirm your new password!'}]}
                  >
                      <Input type="password" placeholder="Confirm new password"/>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" className="gx-mb-0" htmlType="submit" style={{ float: 'right' }}>
                      <IntlMessages id="app.userAuth.forgotButton"/>
                    </Button>
                  </FormItem>
                </Form>
              </div>

              {loader ?
                <div className="gx-loader-view">
                  <CircularProgress/>
                </div> : null}
              {!isEmpty(this.props.errors) ? this.handleOnError(!isEmpty(this.props.errors)) : ''}
            </div>
          </div>
        </div>
        <Footer>
          <NotLoggedFooter />
        </Footer>
      </Layout>
    );
  }
}


const mapStateToProps = ({auth, authNew, errors, settings}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  const {locale} = settings;
  return {loader, alertMessage, showMessage, authUser, authNew, errors, locale}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  loginUser,
  clearErrors,
  switchLanguage
})(ResetPassword);



