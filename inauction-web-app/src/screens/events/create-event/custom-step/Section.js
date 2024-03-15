import React, { useEffect } from "react";
import Auxiliary from "../../../../util/Auxiliary";
import {
  Form,
  Col,
  DatePicker,
  Input,
  Radio,
  Row,
  Statistic,
} from "antd";
import {preQualification} from '../Constants'
import '../style.css';

const RadioGroup = Radio.Group;

const Section = ({ questionnaire, handleChangeQuestionnaire }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: questionnaire.title,
            deadline: questionnaire.deadline,
            pre_qualification: questionnaire.pre_qualification,
        });
    }, [questionnaire]);

    const onValuesChange = value => {
        const propName = Object.keys(value)[0];
        const propValue = value[Object.keys(value)]
        handleChangeQuestionnaire(propName, propValue);
    }

    return (
        <Auxiliary>
            <hr/>
            <Row gutter={[16, 0]}>
                <Col span={24} style={{display: 'inline-flex'}}>
                    <h3 style={{textAlign: "center", flex: 'auto'}}>QUESTIONNAIRE: {questionnaire.title}</h3>
                    {questionnaire.hasWeighting > 0 &&
                        <Statistic
                            style={{float: 'right'}}
                            title="Weight"
                            value={questionnaire.weighting}
                            suffix="/ 100%"
                        />
                    }
                </Col>
            </Row>
            <Form
                form={form}
                name={questionnaire.title}
                initialValues={{...questionnaire}}
                onValuesChange={onValuesChange}
                layout="vertical"
            >
                <Form.Item
                    label="Questionnaire Name"
                    name="title"
                    rules={[{ required: true, message: 'Please input questionnaire name!'}]}
                >
                    <Input placeholder='Enter questionnaire name'/>
                </Form.Item>
                <Form.Item
                    label="Deadline"
                    name="deadline"
                    rules={[{ required: true, message: 'Please pick questionnaire deadline!'}]}
                >
                    <DatePicker
                        getPopupContainer={trigger => trigger.parentNode}
                        style={{width: "100%"}}
                        showTime
                        showNow={false}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select Questionnaire Deadline"
                        disabledDate={d => !d || d.isBefore(Date.now())}
                    />
                </Form.Item>
                <Form.Item
                    label="Pre-qualification"
                    name="pre_qualification"
                    rules={[{ required: true, message: 'Please choose pre-qualification!'}]}
                >
                    <RadioGroup options={preQualification} />
                </Form.Item>
            </Form>  
        </Auxiliary>
    );
};

export default Section;
