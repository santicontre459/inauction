import React from "react";
import '@ant-design/compatible/assets/index.css';
import {
  Button,
  Input,
  Layout,
  Row,
  Col,
  Divider,
  Select,
  Upload,
  Tooltip,
  Form} from "antd";
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
  addCompany,
  getMainActivities,
  getUserPositions,
  uploadCompanyDocs,
} from '../redux/actions/companyActions';
import { clearErrors } from '../redux/actions/authActions';
import IntlMessages from "util/IntlMessages";
import {message} from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";
import isEmpty from "../util/isEmpty";
import { Helmet } from "react-helmet";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Footer, Header} = Layout;
const Option = Select.Option;

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
class CompanyVerification extends React.Component {

  handleSubmit = (values) => {
    let companyData = {
      name: values.company_name,
      business_registration_number: values.business_registration_number,
      legal_representative_name: values.legal_representative_name,
      legal_representative_surname: values.legal_representative_surname,
      business_operation_id: values.main_activity_area,
      position: values.position,
      user_id: this.props.authNew.user.id,
      business_certificate: values.business_certificate,
      identity_document: values.identity_document,
    };

    try {
      this.props.addCompany(companyData);
      this.setState({uploading_business_certificate: true});
      this.setState({uploading_identity_document: true});
    } catch (e) {
      // do nothing
    }
  };

  // handle error response
  handleOnError = (error) => {
    if (error) {
      message.error(this.props.errors.message);
      return this.props.clearErrors();
    } else {
      return null;
    }
  };

  // handle success response
  handleOnSuccess = () => {
    const { company } = this.props.companyData;
    if (!isEmpty(company)) {
      setTimeout(() => {
        this.props.history.push('/company-verification-pending');
      }, 4000);
      return message.success(company.message);
    } else {
      return null;
    }
  };

  handleOnSuccessAfterVerified = () => {
    message.success("Bidder has been verified successfully, please proceed with entering your company information!");
  };

  constructor() {
    super();
    this.state = {
      company_name_value: '',
      business_registration_number_value: '',
      legal_representative_name_value: '',
      legal_representative_surname_value: '',
      main_activity_area_value: '',
      position_value: '',
      business_certificate: [],
      identity_document: [],
      uploading_business_certificate: false,
      uploading_identity_document: false,
    }
  }

  // validation for form if has errors
  hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

  componentDidMount() {
     this.props.getMainActivities();
     this.props.getUserPositions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authNew.isAuthenticated !== prevProps.authNew.isAuthenticated) {
      this.props.history.push('/')
    }

    if (this.props.authNew.emailVerified !== prevProps.authNew.emailVerified) {
      this.handleOnSuccessAfterVerified();
    }

    // handle error and success responses
    !isEmpty(this.props.errors) ? this.handleOnError(this.props.errors) : this.handleOnSuccess();
  }

  render() {
    const { loader } = this.props;
    const { companyRegistrationMainActivities, bidderRegistrationUserPositions } = this.props.companyData;

    const normFile = e => {

      if (Array.isArray(e)) { return e; }

      let fileReader = new FileReader();
      let bfile;
      let file = e.fileList[0];

      fileReader.onload = function(e) {
        bfile = e.target.result;
        newFile.buffer = bfile;
      };

      let newFile = {};
      if (e && e.fileList && e.fileList.length > 0) {
        fileReader.readAsDataURL( e.fileList[0].originFileObj);
        newFile.fieldname = 'file';
        newFile.originalname = file.name;
        newFile.mimetype = file.type;
        newFile.size = file.size;
      }

      return newFile;

    };

    const business_certificate_props = {
      name: 'business_certificate',
      multiple: false,
      onRemove: file => {
        this.setState(state => {
          return {
            business_certificate: []
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          business_certificate: [file]
        }));
        return false;
      },
      ...this.state.business_certificate
    };
    const identity_document_props = {
      name: 'identity_document',
      multiple: false,
      onRemove: file => {
        this.setState(file => {
          return {
            identity_document: []
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          identity_document: [file]
        }));
        return false;
      },
      ...this.state.identity_document
    };

    return (
      <Layout className="gx-app-layout not-logged-in-routes-layout">
        <Helmet>
          <title>Company Verification - iNauction Tool | Procurement Platform</title>
        </Helmet>
        <Header className="ant-layout-header-not-logged">
          <NotLoggedHeader />
        </Header>
        <div className="gx-app-login-wrap app-register-form">
          <div className="gx-app-login-container gx-host-form-register">
            <div className="gx-app-login-main-content">
              <div className="gx-app-register-content app-register-form">
                <div className="gx-app-logo-wid">
                  <h1><IntlMessages id="app.userAuth.company.verification.title"/></h1>
                  <span><IntlMessages id="app.userAuth.company.verification.label"/></span>
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
                        label={<IntlMessages id="app.userAuth.company.verification.input.companyName"/>}
                        labelAlign="left"
                        name="company_name"
                        rules={[{ required: true, message: 'Please input your company name'}]}
                      >
                        <Input
                          placeholder="Company Name"
                          onChange={form => this.setState({company_name_value: form.target.value})}
                        />
                      </Form.Item>
                    </Col>
                    <Col className="app-company-verify-business-number" lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.company.verification.input.nipt"/>}
                        labelAlign="left"
                        name="business_registration_number"
                        rules={[{required: true, message: 'Please input your Business Registration Number!'}]}
                      >
                        <Input
                          placeholder="Business Registration Number"
                          onChange={form => this.setState({business_registration_number_value: form.target.value})}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={8} md={8} sm={24} xs={24}>
                      <Form.Item
                        label={<IntlMessages id="app.userAuth.company.verification.input.representativeName"/>}
                        labelAlign="left"
                        name="legal_representative_name"
                        rules={[{required: true, message: 'Please input your legal representative you name!'}]}
                      >
                        <Input
                          placeholder="Legal Representative Name"
                          onChange={form => this.setState({legal_representative_name_value: form.target.value})}
                        />
                        </Form.Item>
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Form.Item
                          label={<IntlMessages id="app.userAuth.company.verification.input.representativeSurname"/>}
                          labelAlign="left"
                          name="legal_representative_surname"
                          rules={[{required: true, message: 'Please input your legal representative surname!'}]}
                        >
                          <Input
                            placeholder="Legal Representative Surname"
                            onChange={form => this.setState({legal_representative_surname_value: form.target.value})}
                          />
                        </Form.Item>
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24} className="company-verification-job-position">
                      { bidderRegistrationUserPositions && <Form.Item
                        label={<IntlMessages id="app.userAuth.company.verification.input.jobPosition"/>}
                        labelAlign="left"
                        name="position"
                        rules={[{required: true, message: 'Please input your company job position!'}]}
                      >
                        <Select
                          placeholder="Job Position"
                          onChange={value => this.setState({position_value: value})}
                        >
                          {
                            bidderRegistrationUserPositions.map(b => (
                            <Option key={b.id} value={b.id}>{b.name}</Option>
                            ))
                          }
                          </Select>
                      </Form.Item> }
                    </Col>
                  </Row>
                  <Row gutter={16} className="upload-row-not-logged">
                    <Col lg={8} md={8} sm={24} xs={24}>
                      { companyRegistrationMainActivities && <Form.Item
                          label={<IntlMessages id="app.userAuth.company.verification.input.activityArea"/>}
                          labelAlign="left"
                          name="main_activity_area"
                          rules={[{required: true, message: 'Please input your main activity area!'}]}
                        >

                        <Select
                          placeholder="Main activity area"
                          onChange={value => this.setState({main_activity_area_value: value})}
                        >
                          { companyRegistrationMainActivities.map(e => (
                              <Option key={e.id} value={e.id}>{e.name}</Option>
                            ))
                          }
                        </Select>
                      </Form.Item>}
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24} id="upload1-not-logged">
                      <Form.Item
                        name="business_certificate"
                        label={<>
                          <IntlMessages id="app.userAuth.company.verification.input.uploadLabelSecond"/>
                          <Tooltip
                            className="not-logged-tooltip"
                            title={<IntlMessages id="app.userAuth.company.verification.input.tooltip.labelFirst"/>}
                          >
                            <InfoCircleOutlined />
                          </Tooltip>
                        </>}
                        labelAlign="left"
                        valuePropName="business_certificate"
                        getValueFromEvent={normFile}
                        className="upload-btn-upload-label"
                        rules={[{required: true, message: 'Please upload your business certificate!'}]}
                      >
                        <Upload
                          {...business_certificate_props}
                          maxCount={1}
                          accept={"application/pdf"}
                          listType={"picture"}
                        >
                          <Button icon={<UploadOutlined />}>
                            <IntlMessages id="app.userAuth.company.verification.input.uploadLabel"/>
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>

                    <Col lg={8} md={8} sm={24} xs={24} id="upload2-not-logged">
                      <Form.Item
                        name="identity_document"
                        label={<>
                          <IntlMessages id="app.userAuth.company.verification.input.uploadLabelFirst"/>
                          <Tooltip
                            className="not-logged-tooltip"
                            title={<IntlMessages id="app.userAuth.company.verification.input.tooltip.labelSecond"/>}
                          >
                            <InfoCircleOutlined />
                          </Tooltip>
                        </>}
                        labelAlign="left"
                        valuePropName="identity_document"
                        getValueFromEvent={normFile}
                        className="upload-btn-upload-label"
                        rules={[{required: true, message: 'Please upload your documents!'}]}
                      >
                        <Upload
                         {...identity_document_props}
                         maxCount={1}
                         accept={"application/pdf,image/*"}
                         listType={"picture"}
                        >
                          <Button icon={<UploadOutlined />}>
                            <IntlMessages id="app.userAuth.company.verification.input.uploadLabel"/>
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item className="action-host-register">
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={!this.state.business_certificate.length || !this.state.identity_document.length}
                          className="gx-mb-0 gx-mr-0 gx-mt-2"
                        >
                          <IntlMessages id="app.userAuth.company.verification.button"/>
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <Divider />
                <Row className="app-bottom-register" gutter={16}>
                  <Col lg={24} md={10} sm={24} xs={24}>
                    <div className="logo_signup gx-app-logo" style={{width: '100%', textAlign: 'center'}}>
                      <img alt="logo_signup" style={{maxWidth: 200}}  src={require("assets/images/inauction_logo.png")}/>
                    </div>
                  </Col>
                </Row>

              </div>
              {loader ?
                <div className="gx-loader-view">
                  <CircularProgress/>
                </div> : null}
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
  return {loader, alertMessage, showMessage, authUser,companyData, authNew, errors, locale}
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader,
  getMainActivities,
  getUserPositions,
  addCompany,
  uploadCompanyDocs,
  clearErrors,
})(CompanyVerification);
