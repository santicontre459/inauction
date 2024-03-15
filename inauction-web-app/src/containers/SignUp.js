import React from "react";
import '@ant-design/compatible/assets/index.css';
import {
  Button,
  Checkbox,
  Input,
  Layout,
  Row,
  Col,
  Divider,
  Form
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../styles/login.css';
import NotLoggedFooter from "../components/NotLoggedFooter/index";
import NotLoggedHeader from "../components/NotLoggedHeader/index";
import {
  hideMessage,
  showAuthLoader,
  userSignUp,
} from "../iNRedux/actions/Auth";
import {registerUser, clearErrors} from '../redux/actions/authActions';

import IntlMessages from "util/IntlMessages";
import {message} from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";
import isEmpty from "../util/isEmpty";
import { Helmet } from "react-helmet";

const { Footer, Header} = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24}
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24}
  },
};



class SignUp extends React.Component {
  handleSubmit = (values) => {
      let user =
        {
          first_name: values.name,
          last_name: values.surname,
          email: values.email,
          phone: values.phone_number,
          password: values.password,
        };

      try {
        this.props.registerUser(user);
      } catch (e) {
        console.log(e);
      }
  };

  // handle error response
  handleOnError = (error) => {
    if (error) {
      setTimeout(() => {
        this.props.clearErrors();
      }, 3000);
      return message.error(this.props.errors.message);
    } else {
      return null;
    }
  };

  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      password: '',
      confirmTermsOfUse: false,
    }
  }


  // check password matching
  checkPassword = (rule, value, callback) => {
    if (value && value !== this.state.password) {
      callback("The passwords don't match");
    } else {
      callback();
    }
  };

  // validation for form if has errors
  hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);


  componentDidUpdate(prevProps, prevState) {
    if (this.props.authNew.isAuthenticated !== prevProps.authNew.isAuthenticated) {
      this.props.history.push('/')
    }
  }


  render() {
    const { showMessage, loader, alertMessage, locale } = this.props;
    return (
      <Layout className="gx-app-layout not-logged-in-routes-layout">
        <Helmet>
          <title>Register - iNauction Tool | Procurement Platform</title>
        </Helmet>
        <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader history={this.props.history} />
        </Header>
        <div className="gx-app-login-wrap app-register-form">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content">
              <div className="gx-app-register-content app-register-form">
                <div className="gx-app-logo-wid">
                  <h1><IntlMessages id="app.userAuth.register.title"/></h1>
                  <span><IntlMessages id="app.userAuth.register.label"/></span>
                  <hr />
                </div>
                <Form
                  onFinish={this.handleSubmit}
                  className="gx-signup-form gx-form-row0 not-logged-form"
                  {...formItemLayout}
                  name="dynamic_form_item"
                  initialValues={{...this.state}}
                  colon={false}
                >
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.register.input.name"/>}
                        labelAlign="left"
                        name="name"
                        rules={[{ required: true, message: 'Please input your first name!'}]}
                      >
                          <Input placeholder="First name" onChange={form => this.setState({name: form.target.value})}/>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24} >
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.register.input.surname"/>}
                        labelAlign="left"
                        name="surname"
                        rules={[{ required: true, message: 'Please input your last name!'}]}
                      >
                          <Input placeholder="Last name" onChange={form => this.setState({surname: form.target.value})}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.register.input.email"/>}
                        labelAlign="left"
                        name="email"
                        rules={[{ required: true, message: 'The input is not valid E-mail!'}]}
                      >
                          <Input placeholder="Email" onChange={form => this.setState({email: form.target.value})}/>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.register.input.phone"/>}
                        labelAlign="left"
                        name="phone_number"
                        rules={[{ required: true, message: 'Please input your company number!'}]}
                      >
                          <Input type="number" placeholder="Phone Number" onChange={form => this.setState({phone_number: form.target.value})}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.register.input.password"/>}
                        labelAlign="left"
                        name="password"
                        rules={[{ required: true, message: 'Password is Required!'}]}
                      >
                          <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={form => this.setState({password: form.target.value})}
                          />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.register.input.password_confirm"/>}
                        labelAlign="left"
                        name="corfirmPassword"
                        rules={[{ required: true, message: 'Confirm your Password!'}, {validator: this.checkPassword}]}
                      >
                          <Input
                            name="password"
                            type="password"
                            placeholder="Confirm Password"
                          />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="confirmTermsOfUse"
                        className="gx-row-0-checkbox"
                        rules={[{validator: (rule, value, callback)=>{
                          if(this.state.confirmTermsOfUse) {
                            return callback()
                          }
                          return callback("Please agree to terms and conditions to register!")
                        }}]}
                      >
                        <Checkbox
                          checked={this.state.confirmTermsOfUse}
                          onChange={()=>this.setState({confirmTermsOfUse: !this.state.confirmTermsOfUse})}
                        >
                          <span className="register-accept-terms">
                            <IntlMessages id="app.userAuth.register.click"/>
                            <span> <IntlMessages id="app.userAuth.register.title"/></span>
                            &nbsp;<IntlMessages id="app.userAuth.register.confirm"/> &nbsp;
                            <Link to="/login"><IntlMessages id="app.userAuth.register.terms"/></Link>
                          </span>
                        </Checkbox>

                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item className="action-signup">
                        <Button
                          type="primary"
                          htmlType="submit"
                          // disabled={this.hasErrors(this.props.form.getFieldsError())}
                          className="gx-mb-0 gx-mr-0 gx-mt-2"
                        >
                          <IntlMessages id="app.userAuth.register.title"/>
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <Divider />
                <Row className="app-bottom-register" gutter={16}>
                  <Col lg={10} md={10} sm={24} xs={24}>
                    <div className="logo_signup gx-app-logo">
                      <img alt="logo_signup" src={require("assets/images/inauction_logo.png")}/>
                    </div>
                  </Col>
                  <Col lg={14} md={14} sm={24} xs={24} className="app-bottom-register-host">
                    <p>
                      <IntlMessages id="app.userAuth.haveAccount"/> &nbsp;
                      <Link to="/login"><IntlMessages id="app.userAuth.signIn"/></Link>
                    </p>
                    <Link to="/host-registration-form"> <IntlMessages id="app.userAuth.getAccount.contact.host"/> </Link>
                    <span><IntlMessages id="app.userAuth.getAccount.contact.host.register"/></span>
                  </Col>
                </Row>

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
  userSignUp,
  hideMessage,
  showAuthLoader,
  registerUser,
  clearErrors
})(SignUp);
