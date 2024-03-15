import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import './Index.css'
import { connect } from "react-redux";
import { addEvent } from "../../../../redux/actions/eventActions";
import { Card, Form, Input, Button, Select , message} from 'antd';
import { updateUserDetails } from "../../../../redux/actions/authActions";
import isEmpty from "../../../../util/isEmpty";

const Option = Select.Option;
class GeneralInformation extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            company_position: '',
            role: '',
            accountType: '',
            successMessage: false,
            errorMessage: false
        };
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.authNew.user.firstName,
            lastName: this.props.authNew.user.lastName,
            username: this.props.authNew.user.email,
            accountType: this.props.authNew.user.role.roleName,
            role: this.props.authNew.user.subrole.roleName,
            company_position: this.props.authNew.user.position,
        });
    }

    handleOnError = (error) => {
        if (error) {
          setTimeout(() => {
            this.props.clearErrors();
          }, 1000);
          return message.error(this.props.errors.message);
        } else {
          return null;
        }
      };
    

    render() {
        const { bidderRegistrationUserPositions } = this.props.companyData;

        const tailLayout = {
            wrapperCol: {
                span: 24,
                align: 'right',
            },
        };

        const onFinish = values => {
            console.log('Success:', values);
            this.props.updateUserDetails({
                firstName: values.firstName,
                lastName: values.lastName
            }).then((data)=>{
                return message.success(data.message || 'Success');
            })
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Card className="gx-card user-profile-gx-card input-form-border" title={"General Information    (NIPT)"}>
                <span className="gx-media-input-form-details">
                    <IntlMessages id="user.profile.general.information" />
                </span>
                {!isEmpty(this.props.errors) ? this.handleOnError(!isEmpty(this.props.errors)) : ''}
                <Form
                    name="GeneralInformation"
                    initialValues={{
                        ...this.state,
                        ...{
                            firstName: this.props.authNew.user.firstName,
                            lastName: this.props.authNew.user.lastName,
                            username: this.props.authNew.user.email,
                            accountType: this.props.authNew.user.role.roleName,
                            role: this.props.authNew.user.subrole.roleName,
                            company_position: this.props.authNew.user.position,
                        },
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        label={<IntlMessages id="user.profile.first_name" />}
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.last_name" />}
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your Last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.username" />}
                        name="username"
                    >
                        <Input disabled />
                    </Form.Item>
                    {bidderRegistrationUserPositions && <Form.Item
                        label={<IntlMessages id="user.profile.company_position" />}
                        name="company_position"
                    >
                        <Select
                            disabled
                            placeholder="Enter company position"
                            onChange={value => this.setState({ company_position: value })}
                        >
                            {
                                bidderRegistrationUserPositions.map(b => (
                                    <Option key={b.id} value={b.id}>{b.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>}
                    <Form.Item
                        label={<IntlMessages id="user.profile.account_type" />}
                        name="accountType"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.role" />}
                        name="role"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

const mapStateToProps = ({ authNew, companyData, errors }) => {
    return { authNew, companyData, errors }
};

export default connect(mapStateToProps, { addEvent, updateUserDetails })(GeneralInformation);
