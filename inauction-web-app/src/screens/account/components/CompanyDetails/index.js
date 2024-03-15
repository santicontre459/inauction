import React, { Component } from "react";
import { DatePicker, Card, Select, Form, Input, Button, message } from 'antd';
import IntlMessages from "../../../../util/IntlMessages";
import { connect } from "react-redux";
import { addEvent } from "../../../../redux/actions/eventActions";
import { clearErrors } from "../../../../redux/actions/errorAction";
import { updateCompanyDetails } from "../../../../redux/actions/companyActions";
import moment from "moment";
import isEmpty from "../../../../util/isEmpty";
import { getPhoneNumberWithPrefix } from "../../../../util/common";
import './Index.css'

const Option = Select.Option;

class CompanyDetails extends Component {

  constructor() {

    super();

    this.state = {
      name: '',
      description: '',
      legal_representative_surname: '',
      legal_representative_name: '',
      business_operation: null,
      representative_position : null,
      phone: '',
      website: '',
      establishment: '',
      successMessage: false,
      errorMessage: false
    };
  }

  componentDidMount() {
    this._getUserCompanyDetails();
  }

  // Retrieve User Company Details
  _getUserCompanyDetails() {
    this.setState({
      name: this.props.authNew.user.company.name,
      description: this.props.authNew.user.company.description,
      legal_representative_surname: this.props.authNew.user.company.legalRepresentativeSurname,
      legal_representative_name: this.props.authNew.user.company.legalRepresentativeName,
      business_operation: this.props.authNew.user.company.businessOperation?.id,
      representative_position : this.props.authNew.user.position,
      prefix: getPhoneNumberWithPrefix(this.props.authNew.user.company.phoneNumber)[0],
      phone: getPhoneNumberWithPrefix(this.props.authNew.user.company.phoneNumber)[1],
      website: this.props.authNew.user.company.websiteUrl,
      establishment_date: moment(this.props.authNew.user.company.establishment_date)
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
    const { companyRegistrationMainActivities, bidderRegistrationUserPositions } = this.props.companyData;

    const tailLayout = {
      wrapperCol: {
        span: 24,
        align: 'right',
      },
    };

    const onFinish = values => {
      // console.log('Success:', values);
      this.props.updateCompanyDetails(this.props.authNew.user.company.id, {
        ...values,
        phone_number: values.prefix + values.phone
      }).then((data)=>{
        return message.success(data.message || 'Success');
      });
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 80,
          }}
        >
          <Option value="+355">+355</Option>
          <Option value="+383">+383</Option>
          <Option value="+39">+39</Option>
        </Select>
      </Form.Item>
    );
    return (
      <Card className="gx-card user-profile-gx-card input-form-border" title={"Company Details"}>
        <span className="gx-media-input-form-details">
          <IntlMessages id="user.profile.company.information" />
        </span>
        {!isEmpty(this.props.errors) ? this.handleOnError(!isEmpty(this.props.errors)) : ''}
        <Form
          name="CompanyDetails"
          initialValues={{
            ...this.state,
            ...{
              name: this.props.authNew.user.company.name,
              description: this.props.authNew.user.company.description,
              legal_representative_surname: this.props.authNew.user.company.legalRepresentativeSurname,
              legal_representative_name: this.props.authNew.user.company.legalRepresentativeName,
              business_operation: this.props.authNew.user.company.businessOperation?.id,
              representative_position : this.props.authNew.user.position,
              prefix: getPhoneNumberWithPrefix(this.props.authNew.user.company.phoneNumber)[0],
              phone: getPhoneNumberWithPrefix(this.props.authNew.user.company.phoneNumber)[1],
              website: this.props.authNew.user.company.websiteUrl,
              establishment_date: moment(this.props.authNew.user.company.establishment_date)
            }
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<IntlMessages id="user.profile.company.name" />}
            name="name"
            rules={[{ required: true, message: 'Please input your company name!' }]}
          >
            <Input placeholder={'Enter company Name'} />
          </Form.Item>
          <Form.Item
            label={<IntlMessages id="user.profile.company.description" />}
            name="description"
            rules={[{ required: true, message: 'Please input your company description!' }]}
          >
            <Input placeholder={'Enter company description'} />
          </Form.Item>
          <Form.Item
            label={<IntlMessages id="user.profile.company.representative_surname" />}
            name="legal_representative_surname"
            rules={[{ required: true, message: 'Please input your company representative surname!' }]}
          >
            <Input placeholder={'Enter company representative surname'} />
          </Form.Item>
          <Form.Item
            label={<IntlMessages id="user.profile.company.representative_name" />}
            name="legal_representative_name"
            rules={[{ required: true, message: 'Please input your company representative name!' }]}
          >
            <Input placeholder={'Enter company representative name'} />
          </Form.Item>
          {bidderRegistrationUserPositions && <Form.Item
            label={<IntlMessages id="user.profile.company.representative_position" />}
            name="representative_position"
            rules={[{ required: true, message: 'Please input your company representative company position!' }]}
          >
            <Select
              placeholder="Enter company representative company position"
              onChange={value => this.setState({ representative_position: value })}
            >
              {
                bidderRegistrationUserPositions.map(b => (
                  <Option key={b.id} value={b.id}>{b.name}</Option>
                ))
              }
            </Select>
          </Form.Item>}
          {companyRegistrationMainActivities && <Form.Item
            label={<IntlMessages id="user.profile.company.industry" />}
            name="business_operation"
            rules={[{ required: true, message: 'Please input your company industry!' }]}
          >
            <Select
              placeholder="Enter company industry"
              onChange={value => this.setState({ business_operation: value })}
            >
              {companyRegistrationMainActivities.map(e => (
                <Option key={e.id} value={e.id}>{e.name}</Option>
              ))}
            </Select>
          </Form.Item>}
          <Form.Item
            label={<IntlMessages id="user.profile.phone" />}
            name="phone"
            rules={[{ required: true, message: 'Please input your company phone number!' }]}
          >
            <Input
              addonBefore={prefixSelector}
              placeholder={'Enter company company phone number'}
            />
          </Form.Item>
          <Form.Item
            label={<IntlMessages id="user.profile.company.website" />}
            name="website"
            rules={[{ required: true, message: 'Please input your company website!' }]}
          >
            <Input placeholder={'Enter company website'} />
          </Form.Item>
          <Form.Item
            label={<IntlMessages id="user.profile.company.establishment" />}
            name="establishment_date"
            rules={[{ required: true, message: 'Please input your company establishment date!' }]}
          >
            <DatePicker
              style={{ display: 'block' }}
              placeholder={'Enter company establishment date'}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card >
    );
  }
}


const mapStateToProps = ({ authNew, errors, companyData }) => {
  return { authNew, errors, companyData }
};


export default connect(mapStateToProps, { addEvent, clearErrors, updateCompanyDetails })(CompanyDetails);
