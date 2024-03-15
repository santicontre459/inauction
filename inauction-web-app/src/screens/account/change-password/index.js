import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Input } from "antd";
import IntlMessages from "../../../util/IntlMessages";
import './index.css';
import { Helmet } from "react-helmet";
import Auxiliary from "../../../util/Auxiliary";
import { Link } from "react-router-dom";
import { Breadcrumbs } from '../../../components/breadcrumbs';

const FormItem = Form.Item;
const customer = JSON.parse(localStorage.getItem('jwtUser'));

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      current_password: '',
      new_password: '',
      successMessage: false,
      errorMessage: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords are not the same!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.props.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
        <Auxiliary>
          <Breadcrumbs description = {"Change Your Password"} name = {"Change Password"} />
          <Card className="gx-change-password-content gx-card user-profile-gx-card input-form-border" title={ "Change Password"}>
            <Helmet>
              <title>iNauction Tool | {customer.subrole.description} | Change Password</title>
            </Helmet>
            <div className="gx-login-container gx-password-container">
              <div>
                <span className="gx-media-input-form-details">
                  <IntlMessages id="appModule.enterPasswordReset"/>
                </span>
                <Form onSubmit={this.handleSubmit} className="gx-login-form user-profile-gx-media-card gx-form-row0">

                  {/*Input Fields */}
                  <FormItem>
                    {getFieldDecorator('passwordOld', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your current password!'
                        }, {
                          validator: "",
                        }],
                    })(
                      <div className="gx-media gx-align-items-center gx-flex-nowrap">
                        <div className="gx-media-body custom-profile-gx-media-body">
                          <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                            <IntlMessages id="user.account.change_password.current_password"/>
                            <span className="required-label-dot">*</span>
                          </span>
                          <Input
                            type={'password'}
                            placeholder={'Enter current password'}
                            onChange={(event) =>  this.setState({ current_password: event.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your new password!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                        <div className="gx-media gx-align-items-center gx-flex-nowrap">
                          <div className="gx-media-body custom-profile-gx-media-body">
                            <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                                <IntlMessages id="user.account.change_password.new_password"/>
                                <span className="required-label-dot">*</span>
                            </span>
                            <Input
                              type={'password'}
                              placeholder={'Enter new password'}
                              onChange={(event) => this.setState({ new_password: event.target.value })}
                            />
                          </div>
                        </div>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: 'Please confirm your new password!',
                      }, {
                        validator: this.compareToFirstPassword,
                      }],
                    })(
                        <div className="gx-media gx-align-items-center gx-flex-nowrap">
                          <div className="gx-media-body custom-profile-gx-media-body">
                               <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                                   <IntlMessages id="user.account.change_password.confirm_new_password"/>
                                   <span className="required-label-dot">*</span>
                               </span>
                               <Input type={'password'} placeholder={'Confirm new password'}
                                     onBlur={this.handleConfirmBlur} />
                          </div>
                        </div>
                    )}
                  </FormItem>

                  {/* Buttons */}
                  <FormItem className="change-password-btn">
                        <Button type="primary" htmlType="submit" className="ant-btn ant-btn-md" style={{marginRight:"0px"}}>
                          <span>Change</span>
                        </Button>

                          <Button type="button" className="ant-btn ant-btn-danger ant-btn-md" style={{marginRight:"5px"}}>
                            <Link to={"/account/profile"}><span>Cancel</span></Link>
                            </Button>

                  </FormItem>

                </Form>
              </div>
            </div>
          </Card>
        </Auxiliary>
    );
  }
}

const WrappedChangePasswordForm = Form.create()(ChangePassword);

export default (WrappedChangePasswordForm);
