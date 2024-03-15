import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Card, Form, Input, Button, Col, Row, Alert } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import '../index.css'
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { Helmet } from "react-helmet";
import TextArea from "antd/es/input/TextArea";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { inviteBidder } from "../../../redux/actions/bidderActions";
import Can from "../../../components/RoleBasedAccessControl/Can";
import returnPermission from "../../../util/returnPermission";
import { Redirect } from "react-router-dom";

const user = JSON.parse(localStorage.getItem('jwtUser'));
const tailLayout = {
  wrapperCol: {
    span: 24,
    align: 'right',
  },
};

class InviteBidder extends Component {

  formRef = React.createRef();

  constructor() {
    super();
  }

  clearFields = () => {
    this.formRef.current.resetFields();
  }

  onFinish = async values => {
    let bidder = values;
    bidder.user_inviter = user.id;
    bidder.company_inviter = user.company.id;
    bidder.inviter_role = user.subrole.id;
    const result = await this.props.inviteBidder(bidder);
    if (result === 'success') {
      NotificationManager.success('Bidder has been invited successfully!', "Success");
      this.clearFields();
    } else {
      NotificationManager.error(this.props.errors, "Ops");
    }
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  render() {
    return (
      <Can
        role={returnPermission(user)}
        perform="bidder:invite"
        yes={() => (
          <Auxiliary>
            <Helmet>
              <title>iNauction Tool | {user.subrole.description} | Invite Bidder</title>
            </Helmet>
            <Breadcrumbs
              description={<IntlMessages id="user.bidders.invite.bidders_management" />}
              name={<IntlMessages id="user.bidders.invite.invite_bidder" />}
            />
            <Alert
              className="module-informational-notes"
              message={<IntlMessages id="user.bidders.invite.informational_notes.message" />}
              description={<IntlMessages id="user.bidders.invite.informational_notes.description" />}
              type="info"
              showIcon
            />
            <div className="gx-main-content">
              <Row>
                <Col xl={3} lg={3} md={24} sm={24} xs={24} />
                <Col xl={18} lg={18} md={24} sm={24} xs={24} style={{"display": "inline-block"}}>
                  <Card
                    className="gx-card invite-bidder-form-gx-card input-form-border"
                    title={<IntlMessages id="user.bidders.invite.invite_bidder" />}
                  >
                    <span className="gx-media-bidders-details">
                      <IntlMessages id="user.bidders.table.invite.information"/>
                    </span>
                    <Form
                      ref={this.formRef}
                      name="invite_bidder"
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                      layout="vertical"
                    >
                      <Form.Item
                        name="company_name"
                        label={<IntlMessages id="user.bidders.invite.company_name"/>}
                        rules={[{ required: true, message: 'Company name is required!'}]}
                      >
                        <Input placeholder='Enter company name' />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label={<IntlMessages id="user.bidders.invite.email"/>}
                        rules={[{ required: true, message: 'Email is required!'}]}
                      >
                        <Input placeholder='Enter company email' />
                      </Form.Item>
                      <Form.Item
                        name="company_registration_number"
                        label={<IntlMessages id="user.bidders.invite.nipt"/>}
                        rules={[{ required: true, message: 'Company Registration Number is required!'}]}
                      >
                        <Input placeholder='Enter company registration number' />
                      </Form.Item>
                      <Form.Item
                        name="content"
                        label={<IntlMessages id="user.bidders.invite.invitation_content"/>}
                        rules={[{ required: true, message: 'Invitation is required!'}]}
                      >
                        <TextArea placeholder='Enter invitation content' rows={5} />
                      </Form.Item>

                      <Form.Item {...tailLayout}>
                        <Button type="button" className="ant-btn back-to-btn ant-btn-md" style={{marginRight: 10}}>
                          <Link to={"/bidders/invitations"}>
                            <span>
                              <IntlMessages id="user.bidders.invite.back_to_bidders"/>
                            </span>
                          </Link>
                        </Button>
                        <Button type="primary" htmlType="submit" className="ant-btn ant-btn-md" style={{marginRight: 0}}>
                          <span>
                            <IntlMessages id="user.bidders.invite.submit_invite"/>
                          </span>
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
        )}
        no={() => <Redirect exact to={`/dashboard`}/>}
      />
    );
  }
}

const mapStateToProps = ({ errors, bidders }) => {
  return { errors, bidders };
};

export default connect(mapStateToProps, { inviteBidder })(InviteBidder);
