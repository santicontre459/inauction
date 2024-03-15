import React, { Component } from "react";
import { DatePicker, Card, Select, Form, Input, Button, message } from 'antd';
import IntlMessages from "../../../../util/IntlMessages";
import { connect } from "react-redux";
import { addEvent } from "../../../../redux/actions/eventActions";
import { clearErrors } from "../../../../redux/actions/errorAction";
import { updateAddress } from "../../../../redux/actions/companyActions";
import isEmpty from "../../../../util/isEmpty";
import LocationInput from "../../../../components/Common/LocationInput";
import './Index.css'

class Address extends Component {
    formRef = React.createRef();
    constructor() {

        super();

        this.state = {
            country: null,
            state: null,
            city: null,
            street: null,
            formatted_address: null,
            postalCode: null,
            latitude: null,
            longitude: null,
            successMessage: false,
            errorMessage: false
        };
    }

    componentDidMount() {

        this._getUserAddress();

    }

    componentDidUpdate(prevProps, prevState) { 
    }

    // Retrieve User Address Details
    _getUserAddress() {
        if (this.props.authNew.user.company?.address != null) {
            this.setState({
                country: this.props.authNew.user.company.address.country,
                state: this.props.authNew.user.company.address.state,
                city: this.props.authNew.user.company.address.city,
                street: this.props.authNew.user.company.address.address,
                formatted_address: this.props.authNew.user.company.address.addressDetail,
                postalCode: this.props.authNew.user.company.address.postalCode,
                latitude: this.props.authNew.user.company.address.latitude,
                longitude: this.props.authNew.user.company.address.longitude,
            });
        }
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
        const tailLayout = {
            wrapperCol: {
                span: 24,
                align: 'right',
            },
        };

        const onFinish = values => {
            this.props.updateAddress({
                ...values,
                formatted_address: this.state.formatted_address,
                street: this.state.street,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }).then((data) => {
                console.log('updateAddress  ', data)
                return message.success(data.message || 'Success');
            });
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Card className="gx-card user-profile-gx-card input-form-border" title={"Address"}>
                <span className="gx-media-input-form-details">
                    <IntlMessages id="user.profile.address.information" />
                </span>
                {!isEmpty(this.props.errors) ? this.handleOnError(!isEmpty(this.props.errors)) : ''}
                <Form
                    ref={this.formRef}
                    name="Address"
                    initialValues={{
                        ...this.state,
                        ...{
                            country: this.props.authNew.user.company.address.country,
                            state: this.props.authNew.user.company.address.state,
                            city: this.props.authNew.user.company.address.city,
                            street: this.props.authNew.user.company.address.address,
                            formatted_address: this.props.authNew.user.company.address.addressDetail,
                            postalCode: this.props.authNew.user.company.address.postalCode,
                            latitude: this.props.authNew.user.company.address.latitude,
                            longitude: this.props.authNew.user.company.address.longitude,
                        }
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        label={<IntlMessages id="user.profile.address.street" />}
                        name="formatted_address"
                        rules={[{ required: true, message: 'Please input your street!' }]}
                    >
                        <LocationInput
                            defaultInput={this.state.formatted_address}
                            placeholder={"Enter address street"}
                            onChange={(loc) => {
                                console.log('this.form ', this.formRef)
                                this.setState({
                                    street: loc.street,
                                    formatted_address: loc.formatted_address,
                                    latitude: loc.latitude,
                                    longitude: loc.longitude
                                });
                                this.formRef.current.setFieldsValue({
                                    country: loc.country,
                                    state: loc.state,
                                    city: loc.city
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.address.city" />}
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <Input placeholder="Enter address city" />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.address.zip_code" />}
                        name="postalCode"
                        rules={[{ required: true, message: 'Please input your zip code!' }]}
                    >
                        <Input placeholder={'Enter address zip code'} />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.address.state" />}
                        name="state"
                        rules={[{ required: true, message: 'Please input your state!' }]}
                    >
                        <Input placeholder="Enter address state" />
                    </Form.Item>
                    <Form.Item
                        label={<IntlMessages id="user.profile.address.country" />}
                        name="country"
                        rules={[{ required: true, message: 'Please input your country!' }]}
                    >
                        <Input placeholder="Enter address country" />
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


const mapStateToProps = ({ authNew, errors, companyData }) => {
    return { authNew, errors, companyData }
};

export default connect(mapStateToProps, { addEvent, clearErrors, updateAddress })(Address);
