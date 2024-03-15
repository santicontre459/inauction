import React from "react";
import { DatePicker, Select, Input, Form, Radio } from "antd";
import Auxiliary from "../../../../util/Auxiliary";
import * as Constants from "../Constants";
import IntlMessages from "../../../../util/IntlMessages";
import moment from "moment";
import '../style.css';

const Option = Select.Option;
const RadioGroup = Radio.Group;

const RFQ = ({
    form,
    rfqEventType,
    questionnaires,
    handleChangeRFQ,
    handleChangeQuestionnaire,
}) => {

    const onValuesChange = value => {
        const propName = Object.keys(value)[0];
        const propValue = value[Object.keys(value)];
        const validatedInput = getValidatedNumberInput(propName, propValue);
        handleChangeRFQ(propName, validatedInput);
        changeQuestionnaires(propName, validatedInput);
    }

    const getValidatedNumberInput = (propName, propValue) => {
        if (propName === 'price_weighting') {
            let number = +propValue;
            if (number > 100) number = 100;
            if (number < 0) number = 0;
            form.setFieldsValue({ price_weighting: number.toString() });
            return number;
        }
        return propValue;
    }

    const changeQuestionnaires = (propName, propValue) => {
        if (propName === 'price_weighting') {
            const qeWeight = 100 - +propValue;
            if (rfqEventType.questionnaire) {
                handleChangeQuestionnaire('weighting', qeWeight, rfqEventType.questionnaire);
            }
        }
        if (propName === 'questionnaire') {
            const qeWeight = 100 - +form.getFieldValue('price_weighting');
            handleChangeQuestionnaire('weighting', qeWeight, propValue);
        }
    }

    const anyQuestionnaireHasWeighting = () => {
        return questionnaires?.filter(item =>
            item.has_scoring
            && item.has_weighting !== undefined
            && item.has_weighting !== 0
        ).length > 0;
    }

    const hasWeighting = () => {
        return rfqEventType?.weighting != null
            && rfqEventType?.weighting != '0';
    }

    const selectFilterOption = (input, option) => {
        return option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
    }

    return (    
        <Auxiliary>
            <Form
                form={form}
                name={"RFQ"}
                //initialValues={{...settings.fqEventType}}
                onValuesChange={onValuesChange}
                layout="vertical"
            >
                <hr/>
                <span className="ant-card-head-title create-event-head-title input-section-vertical">RFQ</span>
                <br />
                <Form.Item
                    label={<IntlMessages id="event.settings.rfq.deadline"/>}
                    name="bid_deadline"
                    rules={[{ required: true, message: 'Please select bid deadline!'}]}
                >
                    <DatePicker
                        className="gx-w-100"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select Bid Deadline"
                        showNow={false}
                        disabledDate={questionnaires?.length > 0 ? 
                            d => {
                                let minimum = questionnaires[0].deadline;
                                questionnaires.map(item => {
                                    moment(minimum).isBefore(item.deadline) && (minimum = item.deadline)
                                });
                                return !d || d.isBefore(minimum)
                            }
                        :
                            d => !d || d.isBefore(Date.now())
                        }
                        getPopupContainer={trigger => trigger.parentNode}
                    />
                </Form.Item>
                <Form.Item
                    label={<IntlMessages id="event.settings.rfq.bid_direction"/>}
                    name="bid_direction"
                    rules={[{ required: true, message: 'Please select bid direction!'}]}
                >
                    <Select
                        showSearch
                        style={{"width": "100%"}}
                        placeholder="Select Bid Direction"
                        optionFilterProp="children"
                        className="activities-add-gx-media-card"
                        filterOption={selectFilterOption}
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        {Constants.bidDirection.map((item, i) =>
                            <Option key={i} value={item.value}>
                                {item.label}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<IntlMessages id="event.settings.rfq.seal_result_type"/>}
                    name="seal_result_type"
                    rules={[{ required: true, message: 'Please select seal!'}]}
                >
                    <RadioGroup
                        value={rfqEventType?.seal_result_type}
                        options={Constants.sealResultTypeOptions}
                    />
                </Form.Item>
                { anyQuestionnaireHasWeighting() &&
                    <Auxiliary>
                        <Form.Item
                            label={<IntlMessages id="event.settings.rfq.with_weighting"/>}
                            name="weighting"
                            rules={[{ required: true, message: 'Please select if rfq has weighting!'}]}
                        >
                            <Select
                                showSearch
                                style={{"width": "100%"}}
                                placeholder="Select With Weighting Option"
                                optionFilterProp="children"
                                className="activities-add-gx-media-card"
                                filterOption={selectFilterOption}
                                getPopupContainer={trigger => trigger.parentNode}
                            >
                                {Constants.rfqWeightingOptions.map((item, i) => (
                                    <Option key={i} value={item.value}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        { hasWeighting() &&
                            <Auxiliary>
                                <Form.Item
                                    label={<IntlMessages id="event.settings.rfq.price_weighting"/>}
                                    name="price_weighting"
                                    rules={[{ required: true, message: 'Please select price weighting!'}]}
                                >
                                    <Input
                                        addonAfter="%"
                                        type="number"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="questionnaire"
                                    label={<IntlMessages id="event.settings.rfq.which_questionnaire"/>}
                                    rules={[{ required: true, message: 'Please select which questionnaire!'}]}
                                >
                                    <Select
                                        showSearch
                                        style={{"width": "100%"}}
                                        placeholder="Select questionnaire"
                                        optionFilterProp="children"
                                        className="activities-add-gx-media-card"
                                        filterOption={selectFilterOption}
                                        getPopupContainer={trigger => trigger.parentNode}
                                    >
                                        { questionnaires?.map(item => {
                                            if (item.has_scoring && item.has_weighting !== undefined && item.has_weighting !== 0) {
                                                return (
                                                    <Option key={item.questionnaireId} value={item.questionnaireId}>
                                                        {item.title}
                                                    </Option>
                                                );
                                            }
                                        })}
                                    </Select>
                                </Form.Item>
                                { rfqEventType?.questionnaire &&
                                    <Form.Item label={'Questionnaire weighting'}>
                                        <Input
                                            value={100 - (+form.getFieldValue('price_weighting') || 0)}
                                            addonAfter="%"
                                            disabled
                                        />
                                    </Form.Item>
                                }
                            </Auxiliary>
                        }
                    </Auxiliary>
                }
            </Form>
        </Auxiliary>
    );
}

export default RFQ;
