import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Card, Form, Input, Button, Col, Row, Select } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import '../../../styles/style.css';
import '../index.css'
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { Helmet } from "react-helmet";
import { clearErrors } from '../../../redux/actions/authActions';
import { getExpert, addExpert, updateExpert, getExpertPositions } from '../redux/expertsActions';
import { NotificationContainer, NotificationManager } from "react-notifications";

const customer = JSON.parse(localStorage.getItem('jwtUser'));
const tailLayout = {
  wrapperCol: {
    span: 24,
    align: 'right',
  },
};
const Option = Select.Option;

class ExportsCreation extends Component {

  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      registration_method: 'WEB_CONSOLE',
      registration_type: 'BY_CUSTOMER',
      editPage: false,
    };
  }

  async componentDidMount() {
    await this.props.getExpertPositions();
    await this.getUserToEdit();
  }

  getUserToEdit = async () => {
    if (this.props.match.params.id == null) return 
    this.setState({ editPage: true });
    await this.props.getExpert(this.props.match.params.id);
    this.fillFieldsForEdit();
  }

  fillFieldsForEdit = () => {
    const { expert } = this.props.experts;
    this.formRef.current.setFieldsValue({
      first_name: expert.user?.firstName,
      last_name: expert.user?.lastName,
      email: expert.user?.email,
      phone: expert.user?.phoneNumber,
      position: expert.user?.position,
      expert_position: expert.position,
    });
  }

  onFinish = async values => {
    const positionAsNumber = +values.position;
    values.position = positionAsNumber;
    let result = '';
    if (this.state.editPage) result = await this.props.updateExpert(this.props.match.params.id, values);
    else result = await this.props.addExpert(values);
    if (result === 'success') this.onSuccess();
    else {
      this.onError(result);
    }
  }

  onFinishFailed = error => {
    console.log('Failed:', error);
  }

  onSuccess = () => {
    NotificationManager.success('Expert has been created successfully', 'Success', 1000);
    setTimeout(() => { this.props.history.push('/experts/all') }, 1000);
  }

  onError = (error) => {
    NotificationManager.error(error.message, 'Error', 1000);
  }

  render() {
    const { expertPositions } = this.props.experts;

    return (
      <Auxiliary>
        <Helmet>
          <title>iNauction Tool | {customer.subrole.description} | {(this.state.editPage) ? 'Update Expert' : "Add Expert"}</title>
        </Helmet>
        <Breadcrumbs description = {"Experts Management"} name = {(this.state.editPage) ? 'Update Expert' : "Add New Expert"} />
        <div className="gx-main-content">
          <Row>
            <Col xl={3} lg={3} md={24} sm={24} xs={24} />
            <Col xl={18} lg={18} md={24} sm={24} xs={24} style={{ "display": "inline-block" }}>
              <Card className="gx-card add-expert-form-gx-card input-form-border" title={ "Experts Management"}>
                <span className="gx-media-input-form-details">
                  <IntlMessages id="user.expert.experts.block_description"/>
                </span>
                <Form
                  ref={this.formRef}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item
                    label={<IntlMessages id="user.expert.first_name"/>}
                    name="first_name"
                    rules={[{ required: true, message: 'First Name is required!'}]}
                  >
                    <Input placeholder='Enter expert first name' />
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="user.expert.last_name"/>}
                    name="last_name"
                    rules={[{ required: true, message: 'Last Name is required!'}]}
                  >
                    <Input placeholder='Enter expert last name' />
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="user.expert.email"/>}
                    name="email"
                    rules={[{ required: true, message: 'Email is required!'}]}
                  >
                    <Input placeholder='Enter expert email' type="email"/>
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="user.expert.password"/>}
                    name="password"
                    rules={[{ required: true, message: 'Password is required!'}]}
                  >
                    <Input placeholder='Enter expert password' type="password"/>
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="user.expert.phone"/>}
                    name="phone"
                    rules={[{ required: true, message: 'Phone number is required!'}]}
                  >
                    <Input placeholder='Enter expert phone' type="number" min="0"/>
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="user.expert.expert_type"/>}
                    name="position"
                    rules={[{ required: true, message: 'Company position is required!'}]}
                  >
                    <Select
                      placeholder='Enter type of expert position'
                      getPopupContainer={trigger => trigger.parentNode}
                    >
                      { expertPositions?.map(expertPosition => (
                        <Option key={expertPosition.id} value={expertPosition.id}>
                          { expertPosition.name }
                        </Option>
                      )) }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="user.expert.expert_position"/>}
                    name="expert_position"
                    rules={[{ required: true, message: 'Expert position is required!'}]}
                  >
                    <Input placeholder='Enter expert position in your company'/>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button
                      type="button"
                      className="ant-btn back-to-btn ant-btn-md"
                      style={{marginRight: 10}}
                    >
                      <Link to="/experts/all">Back to experts</Link>
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="ant-btn ant-btn-md"
                      style={{marginRight: 0}}
                    >
                      <span>{(this.state.editPage) ? 'Update expert' : "Add expert"}</span>
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xl={3} lg={3} md={24} sm={24} xs={24} />
          </Row>
        </div>
        <NotificationContainer />
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ errors, experts }) => {
  return { errors, experts };
}
const mapDispatchToProps = ({
  getExpert,
  addExpert,
  updateExpert,
  getExpertPositions,
  clearErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportsCreation);
