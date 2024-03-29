import React, {Component} from "react";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, InputNumber, Radio, Rate, Select, Slider, Switch, Upload } from "antd";

import "./otherFormControls.less";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class OtherFormControls extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {xs: 24, sm: 6},
      wrapperCol: {xs: 24, sm: 14},
    };
    return (
      <Card className="gx-card" title="Other Form Controls">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Plain Text"
          >
            <span className="ant-form-text">China</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Select"
            hasFeedback
          >
            {getFieldDecorator('select', {
              rules: [
                {required: true, message: 'Please select your country!'},
              ],
            })(
              <Select placeholder="Please select a country">
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Select[multiple]"
          >
            {getFieldDecorator('select-multiple', {
              rules: [
                {required: true, message: 'Please select your favourite colors!', type: 'array'},
              ],
            })(
              <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="InputNumber"
          >
            {getFieldDecorator('input-number', {initialValue: 3})(
              <InputNumber min={1} max={10}/>
            )}
            <span className="ant-form-text"> machines</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Switch"
          >
            {getFieldDecorator('switch', {valuePropName: 'checked'})(
              <Switch/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Slider"
          >
            {getFieldDecorator('slider')(
              <Slider marks={{0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F'}}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Radio.Group"
          >
            {getFieldDecorator('radio-group')(
              <RadioGroup>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Radio.Button"
          >
            {getFieldDecorator('radio-button')(
              <RadioGroup>
                <RadioButton value="a">item 1</RadioButton>
                <RadioButton value="b">item 2</RadioButton>
                <RadioButton value="c">item 3</RadioButton>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Rate"
          >
            {getFieldDecorator('rate', {
              initialValue: 3.5,
            })(
              <Rate/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Upload"
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Dragger"
          >
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              )}
            </div>
          </FormItem>

          <FormItem
            wrapperCol={{xs: 24, sm: {span: 14, offset: 6}}}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const WrappedDemo = Form.create()(OtherFormControls);


export default WrappedDemo;
