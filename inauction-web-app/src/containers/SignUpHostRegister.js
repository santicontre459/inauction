import React from "react";
import {
  Button,
  Checkbox,
  Input,
  DatePicker,
  Layout,
  Row,
  Col,
  Divider,
  Select,
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
import {
  addHostRegistrationForm,
  clearErrors
} from '../redux/actions/authActions';
import IntlMessages from "util/IntlMessages";
import {message} from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";
import isEmpty from "../util/isEmpty";
import { Helmet } from "react-helmet";
import { getMainActivities } from "../redux/actions/companyActions";

const { Footer, Header} = Layout;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 }
  },
};
class SignUpHostRegister extends React.Component {
  handleSubmit = (values) => {
    let hostForm = {
      entity_name: values.entity_name,
      entity_email: values.entity_email,
      entity_phone_number: values.entity_phone_number,
      entity_representative_full_name: values.entity_representative_full_name,
      entity_business_operation_id: values.entity_business_operation_id,
      entity_average_yearly_turnover: values.entity_average_yearly_turnover,
      entity_business_registration_number: values.entity_business_registration_number
    };
    try {
      this.props.addHostRegistrationForm(hostForm);
    } catch (e) {
      // do nothing
    }
  };

  formRef = React.createRef();

  // handle success response
  handleOnSuccess = () => {

    // reset fields
    this.formRef.current.resetFields();

    return message.success(
      'We have received your application and will ' +
      'notify you promptly in order to complete' +
      'the registration process!'
    );
  };

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

  componentDidMount() {
    this.props.getMainActivities();
  }

  componentDidUpdate(prevProps, prevState) {

    // handle error and success responses
    if (!isEmpty(this.props.errors)) {
      this.handleOnError(!isEmpty(this.props.errors))
    } else {
      if (this.props.authNew.hostRegistrationFormSent !== prevProps.authNew.hostRegistrationFormSent) {
        this.handleOnSuccess();
      }
    }
  }

  constructor() {
    super();
    this.state = {
      entity_name_value: '',
      entity_email_value: '',
      entity_phone_number_value: '',
      entity_representative_full_name_value: '',
      entity_business_operation_id_value: '',
      entity_average_yearly_turnover_value: '',
      entity_business_registration_number_value: ''
    }
  }

  render() {
    const { loader } = this.props;
    const { companyRegistrationMainActivities } = this.props.companyData;

    return (
      <Layout className="gx-app-layout not-logged-in-routes-layout">
        <Helmet>
          <title>Host Registration Form - iNauction Tool | Procurement Platform</title>
        </Helmet>
        <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader />
        </Header>
        <div className="gx-app-login-wrap app-register-form">
          <div className="gx-app-login-container gx-host-form-register">
            <div className="gx-app-login-main-content">
              <div className="gx-app-register-content app-register-form">
                <div className="gx-app-logo-wid">
                  <h1><IntlMessages id="app.userAuth.contact.host.title"/></h1>
                  <span><IntlMessages id="app.userAuth.contact.host.label"/></span>
                  <hr />
                </div>
                <Form
                  onFinish={this.handleSubmit}
                  className="gx-signup-form gx-form-row0 not-logged-form"
                  {...formItemLayout}
                  name="dynamic_form_item"
                  id="host-register-form"
                  initialValues={{...this.state}}
                  ref={this.formRef}
                  colon={false}
                >
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.contact.host.input.companyName"/>}
                        labelAlign="left"
                        name="entity_name"
                        rules={[{ required: true, message: 'Entity name is required!'}]}
                      >
                        <Input
                          placeholder="Entity Name"
                          onChange={form => this.setState({entity_name_value: form.target.value})}
                        />
                      </Form.Item>

                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.contact.host.input.companyEmail"/>}
                        labelAlign="left"
                        name="entity_email"
                        rules= {[{required: true, message: 'Entity email is required!'}]}
                      >
                          <Input placeholder="Entity Email" onChange={form => this.setState({entity_email_value: form.target.value})}/>
                      </Form.Item>

                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.contact.host.input.phoneNumber"/>}
                        labelAlign="left"
                        name="entity_phone_number"
                        rules= {[{required: true, message: 'Entity phone number is required!'}]}
                      >
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          onChange={form => this.setState({entity_phone_number_value: form.target.value})}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.contact.host.input.representativeName"/>}
                        labelAlign="left"
                        name="entity_representative_full_name"
                        rules= {[{required: true, message: 'Representative full name is required!'}]}
                      >
                        <Input
                          placeholder="Representative full name"
                          onChange={form => this.setState({entity_representative_full_name_value: form.target.value})}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} className="row_budget_nipt">
                    <Col lg={8} md={8} sm={24} xs={24}>
                      { companyRegistrationMainActivities && <Form.Item
                        label={<IntlMessages id="app.userAuth.contact.host.input.activityArea"/>}
                        labelAlign="left"
                        name="entity_business_operation_id"
                        rules={[{required: true, message: 'Please enter your main activity area!'}]}
                      >
                        <Select
                          placeholder="Main activity area"
                          onChange={value => this.setState({entity_business_operation_id_value: value})}
                        >
                          { companyRegistrationMainActivities.map(e => (
                            <Option key={e.id} value={e.id}>{e.name}</Option>
                          )) }
                        </Select>
                      </Form.Item> }

                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>

                        <Form.Item
                          className="host-register-form-turnover"
                          label={<IntlMessages id="app.userAuth.contact.host.input.yearlyBudget"/>}
                          labelAlign="left"
                          name="entity_average_yearly_turnover"
                          rules={[{required: true, message: 'Please enter your Average Yearly Turnover!'}]}
                        >
                          <Select
                            placeholder="Average Yearly Turnover"
                            onChange={value => this.setState({entity_average_yearly_turnover_value: value})}
                          >
                            <Option value="0-500.000 Eur">0-500.000 Eur</Option>
                            <Option value="501.000-1.000.000 Eur">501.000-1.000.000 Eur</Option>
                            <Option value="1.000.001-3.000.000 Eur">1.000.001-3.000.000 Eur</Option>
                            <Option value="3.000.001-10.000.000 Eur">3.000.001-10.000.000 Eur</Option>
                            <Option value="More than 10.000.000 Eur">More than 10.000.000 Eur</Option>
                          </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>

                        <Form.Item
                          label={<IntlMessages id="app.userAuth.contact.host.input.nipt"/>}
                          labelAlign="left"
                          name="entity_business_registration_number"
                          rules={[{required: true, message: 'Please enter your Business Registration Number!'}]}
                        >
                          <Input
                            placeholder="Business Registration Number"
                            onChange={form => this.setState({entity_business_registration_number_value: form.target.value})}
                            />
                        </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item className="action-host-register">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="gx-mb-0 gx-mr-0 gx-mt-2"
                        >
                          <IntlMessages id="app.userAuth.contact.host.button"/>
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
                    <Link to="/register"> <IntlMessages id="app.userAuth.getAccount"/> </Link>
                    <span><IntlMessages id="app.userAuth.getAccount.bidder"/></span>
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


const mapStateToProps = ({auth, authNew, errors, settings, companyData}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  const {locale} = settings;
  return {loader, alertMessage, showMessage, authUser, companyData, authNew, errors, locale}
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader,
  getMainActivities,
  addHostRegistrationForm,
  clearErrors
})(SignUpHostRegister);
