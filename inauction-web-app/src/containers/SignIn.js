import React  from "react";
import '@ant-design/compatible/assets/index.css';
import {
  Button,
  Checkbox,
  Input,
  message,
  Layout,
  Form
} from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, clearErrors } from '../redux/actions/authActions';
import '../styles/login.css';
import NotLoggedFooter from "../components/NotLoggedFooter/index";
import NotLoggedHeader from "../components/NotLoggedHeader/index";
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
} from "iNRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import isEmpty from "../util/isEmpty";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

const { Footer, Header} = Layout;

class SignIn extends React.Component {

  constructor() {
    super();
    this.handleChangeExpert = this.handleChangeExpert.bind(this);

    this.state = {
      email: "",
      password: "",
      successMessage: false,
      errorMessage: false,
      errorMessageText: "",
      submitted: false,
    };
  }


  handleChangeExpert(value) {
    this.props.form.setFieldsValue({expert: value});
  }

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
      this.props.history.push('/');
    }
  }



  render() {
    const {loader, intl} = this.props;
    const { formatMessage } = intl;

    const onFinish = values => {
      values.email = this.state.email;
      values.password = this.state.password;
      this.props.loginUser({
        email: values.email,
        password: values.password,
        source: 'web',
      });
      this.setState({
        submitted: true
      });
    };

    const onValuesChange = value => {
      this.setState(value);
    };

    return <Layout className="gx-app-layout not-logged-in-routes-layout">
      <Helmet>
        <title>Login - iNauction Tool | Procurement Platform</title>
      </Helmet>
      <Header className="ant-layout-header-not-logged">
        <NotLoggedHeader history={this.props.history} />
      </Header>
      <div className="gx-app-login-wrap gx-app-borderMobile">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content gx-bottom-padding">
            <div className="gx-app-logo-content gx-app-logo-content-login-left">
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <p>
                  <span><IntlMessages id="app.userAuth.bySigning"/></span><br/>
                </p>

                  <div className="cont_ineg">
                    <i className="icon icon-add-circle gx-pr-2" />
                    <Link to="/register">
                      <IntlMessages id="app.userAuth.getAccount"/>
                    </Link> <IntlMessages id="app.userAuth.getAccount.bidder"/>
                  </div>


                  <div className="cont_ineg">
                    <i className="icon icon-auth-screen gx-pr-2" />
                    <IntlMessages id="app.userAuth.getAccount.contact.host.or"/>
                    <Link to="/host-registration-form">
                      <IntlMessages id="app.userAuth.getAccount.contact.host"/>
                    </Link>
                    <IntlMessages id="app.userAuth.getAccount.contact.host.register"/>

                  </div>

              </div>
              <div className="gx-app-logo gx-hide-mobileLogo">
                <img alt="logo_signin" src={require("assets/images/inauction_logo.png")}/>
              </div>
            </div>
            <div className="gx-app-login-content gx-app-logo-content-login-right">
              <Form
                className="gx-signin-form gx-form-row0"
                layout="vertical"
                name="sing_inForm"
                initialValues={{...this.state}}
                onFinish={onFinish}
                colon={false}
                onValuesChange={onValuesChange}
              >
                <Form.Item
                  className="gx-pb-0 app-ant4-form"
                  label={<IntlMessages id="appModule.email"/>}
                  rules={[{ required: true, message: 'The input is not valid E-mail!'}]}
                  name="email"
                >
                  <Input placeholder={formatMessage({ id: 'appModule.email' })} type="email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!'}]}
                  label={<IntlMessages id="appModule.password"/>}
                >
                  <Input type="password" placeholder={formatMessage({ id: 'appModule.password' })} />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  initialValue="true"
                >
                  <Checkbox>
                    <IntlMessages id="appModule.rememberMe"/>
                  </Checkbox>
                  <Link className="login-form-forgot" to="/forgot-password">
                    <IntlMessages id="appModule.forgotPassword"/>
                  </Link>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className="gx-mb-0"
                    htmlType="submit"
                    style={{ float: 'right' }}
                    key="submit"
                  >
                    <IntlMessages id="app.userAuth.signIn"/>
                  </Button>
                </Form.Item>
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
    </Layout>;
  }
}

const mapStateToProps = ({auth, authNew, errors}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser, authNew, errors}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  loginUser,
  clearErrors
 })(injectIntl(SignIn));
