import React from "react";
import { Checkbox, DatePicker, Input, Row, Col, Select, Form } from "antd";
import Auxiliary from "../../../../util/Auxiliary";
import * as Constants from "../Constants";
import IntlMessages from "../../../../util/IntlMessages";
import '../style.css';

const Option = Select.Option;

const Questionnaire = ({ questionnaire, removeQuestionnaire }) => {

    const onTrashClick = () => {
        removeQuestionnaire(questionnaire.questionnaireId);
    }

    const selectFilterOption = (input, option) => {
        return option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
    }

    const namePrefix = `questionnaire_${questionnaire.questionnaireId}_`;

    return (
        <Auxiliary key={questionnaire.questionnaireId}>
            <div className="questionnaireBackground">
                <span className="ant-card-head-title create-event-head-title">
                    Questionnaire {questionnaire.title}
                </span>
                <br />
                <Row>
                    <Col span={24}>
                        <span style={{"float": "right"}}>
                            <a key={questionnaire.questionnaireId} onClick={onTrashClick}>
                                <i className="icon icon-trash"/>
                            </a>
                        </span>
                    </Col>
                </Row>
                <Form.Item
                    label={<IntlMessages id="event.settings.questionnaire.name"/>}
                    name={`${namePrefix}title`}
                    rules={[{ required: true, message: 'Please input questionnaire name!'}]}
                >
                    <Input placeholder='Enter questionnaire name'/>
                </Form.Item>
                <Form.Item
                    label={<IntlMessages id="event.settings.questionnaire.deadline"/>}
                    name={`${namePrefix}deadline`}
                    rules={[{ required: true, message: 'Please input questionnaire deadline!'}]}
                >
                    <DatePicker
                        style={{width: "100%"}}
                        showTime
                        showNow={false}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select Questionnaire Deadline"
                        disabledDate={d => !d || d.isBefore(Date.now())}
                        getPopupContainer={trigger => trigger.parentNode}
                    />
                </Form.Item>
                <Form.Item
                    label={<IntlMessages id="event.settings.questionnaire.has_scoring"/>}
                    name={`${namePrefix}has_scoring`}
                    valuePropName="checked"
                >
                    <Checkbox>
                        Yes
                    </Checkbox>
                </Form.Item>
                { questionnaire.has_scoring &&
                    <Form.Item
                        label={<IntlMessages id="event.settings.questionnaire.has_weighting"/>}
                        name={`${namePrefix}weighting_type`}
                        rules={[{ required: true, message: 'Please select questionnaire weight!'}]}
                    >
                        <Select
                            showSearch
                            style={{"width": "100%"}}
                            placeholder="Select Has Weighting Options"
                            optionFilterProp="children"
                            className="activities-add-gx-media-card"
                            filterOption={selectFilterOption}
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            {Constants.weightingOptions.map((item, i) =>
                                <Option key={i} value={item.value}>
                                    {item.label}
                                </Option>
                            )}
                        </Select>
                    </Form.Item>
                }
            </div>
        </Auxiliary>
    );
}

export default Questionnaire;
