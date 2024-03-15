import React from "react";
import { DatePicker, Input, Select, Form } from "antd";
import Auxiliary from "../../../../util/Auxiliary";
import * as Constants from "../Constants";
import moment from "moment";
import '../style.css';

const Option = Select.Option;

const OnlineAuction = ({
    form,
    onlineAuctionEventType,
    questionnaires,
    handleChangeOnlineAuction,
    handleChangeQuestionnaire,
}) => {

    const onValuesChange = value => {
        const propName = Object.keys(value)[0];
        const propValue = value[Object.keys(value)];
        const validatedInput = validatedNumberInput(propName, propValue);
        handleChangeOnlineAuction(propName, validatedInput);
        changeQuestionnaires(propName, validatedInput);
    }

    const validatedNumberInput = (propName, propValue) => {
        if (propName === 'price_weighting' || propName === 'min_bid_change' || propName === 'max_bid_change') {
            let number = +propValue;
            if (number < 0) number = 0;
            if (propName === 'price_weighting') {
                if (number > 100) number = 100;
                form.setFieldsValue({ price_weighting: number.toString() });
            }
            if (propName === 'min_bid_change') form.setFieldsValue({ min_bid_change: number.toString() });
            if (propName === 'max_bid_change') form.setFieldsValue({ max_bid_change: number.toString() });
            return number;
        }
        return propValue;
    }

    const changeQuestionnaires = (propName, propValue) => {
        if (propName === 'price_weighting') {
            const qeWeight = 100 - +propValue;
            if (onlineAuctionEventType.questionnaire) {
                handleChangeQuestionnaire('weighting', qeWeight, onlineAuctionEventType.questionnaire);
            }
        }
        if (propName === 'questionnaire') {
            const qeWeight = 100 - +form.getFieldValue('price_weighting');
            handleChangeQuestionnaire('weighting', qeWeight, propValue);
        }
    }

    const selectFilterOption = (input, option) => {
        return option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
    }

    return (
        <Auxiliary>
            <Form
                form={form}
                name={"OA"}
                //initialValues={{...settings.onlineAuctionEventType}}
                onValuesChange={onValuesChange}
                layout="vertical" 
            >
                <hr/>
                <span className="ant-card-head-title create-event-head-title input-section-vertical">RFQ</span>
                <br />
                <Form.Item
                    label="Auction Time and Date"
                    name="start_time"
                    rules={[{ required: true, message: 'Please select bid start time!'}]}
                >
                    <DatePicker
                        getPopupContainer={trigger => trigger.parentNode}
                        className="gx-w-100"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select Auction Time and Date"
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
                    />  
                </Form.Item>
                <Form.Item
                    label="Bid Direction"
                    name="bid_direction"
                    rules={[{ required: true, message: 'Please select bid direction!'}]}
                >
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        showSearch
                        style={{"width": "100%"}}
                        placeholder="Select bid direction"
                        optionFilterProp="children"
                        className="activities-add-gx-media-card"
                        filterOption={selectFilterOption}
                    >
                        {Constants.bidDirection.map((item, i) =>
                            <Option key={i} value={item.value}> {item.label}</Option>
                        )}
                    </Select> 
                </Form.Item>
                <Form.Item
                    label="Competition Info"
                    name="competition_info"
                    rules={[{ required: true, message: 'Please select competition info!'}]}
                >
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        showSearch
                        style={{"width": "100%"}}
                        placeholder="Select Competition Info"
                        optionFilterProp="children"
                        className="activities-add-gx-media-card"
                        filterOption={selectFilterOption}
                    >
                        {Constants.competitionInfo.map((item, i) => <Option key={i} value={item.value}> {item.label}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Minimum Duration"
                    name="min_duration"
                    rules={[{ required: true, message: 'Please select min duration!'}]}
                >
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        showSearch
                        style={{"width": "100%"}}
                        placeholder="Select Minimum Duration"
                        optionFilterProp="children"
                        className="activities-add-gx-media-card"
                        filterOption={selectFilterOption}
                    >
                        {Constants.minDuration.map((item, i) =>
                            <Option key={i} value={item.value}>
                                {item.label}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Dynamic Close Period"
                    name="dynamic_close_period"
                    rules={[{ required: true, message: 'Please select dynamic close period!'}]}
                >
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        showSearch
                        style={{"width": "100%"}}
                        placeholder="Select Dynamic Close Period"
                        optionFilterProp="children"
                        className="activities-add-gx-media-card"
                        filterOption={selectFilterOption}
                    >
                        {Constants.closePeriod.map((item, i) =>
                            <Option key={i} value={item.value}>
                                {item.label}
                            </Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Minimum Bid Change"
                    name="min_bid_change"
                    rules={[{ required: true, message: 'Please enter min bid changes!'}]}
                >
                    <Input
                        addonAfter="%"
                        type="number"
                        placeholder="Minimum Bid Change"
                    />
                </Form.Item>
                <Form.Item
                    label="Maximum Bid Change"
                    name="max_bid_change"
                    rules={[{ required: true, message: 'Please enter max bid changes!'}]}
                >
                    <Input
                        addonAfter="%"
                        type="number"
                        placeholder="Maximum Bid Change"
                    />
                </Form.Item>
                { questionnaires?.filter((item) => {
                    return item.has_scoring && item.has_weighting !== undefined && item.has_weighting !== 0
                }).length > 0 ?
                    <Auxiliary>
                        <Form.Item
                            label="With Weighting"
                            name="weighting"
                            rules={[{ required: true, message: 'Please select weight!'}]}
                        >
                            <Select
                                getPopupContainer={trigger => trigger.parentNode}
                                showSearch
                                style={{"width": "100%"}}
                                placeholder="Select With Weighting Option"
                                optionFilterProp="children"
                                className="activities-add-gx-media-card"
                                filterOption={selectFilterOption}
                            >
                                {Constants.onlineWeightingOptions.map((item, i) =>
                                    <Option key={i} value={item.value}>
                                        {item.label}
                                    </Option>
                                )}
                            </Select>
                        </Form.Item>
            
                        { onlineAuctionEventType?.weighting === 1 &&
                            <Auxiliary>
                                <Form.Item
                                    label="Price Weighting"
                                    name="price_weighting"
                                    rules={[{ required: true, message: 'Please select price weight!'}]}
                                >
                                    <Input
                                        addonAfter="%"
                                        type="number"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Which Questionnaire"
                                    name="questionnaire"
                                    rules={[{ required: true, message: 'Please select questionnaire!'}]}
                                >
                                    <Select
                                        getPopupContainer={trigger => trigger.parentNode}
                                        showSearch
                                        style={{"width": "100%"}}
                                        placeholder="Select "
                                        optionFilterProp="children"
                                        className="activities-add-gx-media-card"
                                        filterOption={selectFilterOption}
                                    >
                                        {questionnaires?.map(item => {
                                            if (item.has_scoring && item.has_weighting != undefined && item.has_weighting !== 0) {
                                                return (
                                                    <Option key={item.questionnaireId} value={item.questionnaireId}>
                                                        {item.title}
                                                    </Option>
                                                );
                                            }
                                        })}
                                    </Select>
                                </Form.Item>
                                { onlineAuctionEventType.questionnaire &&
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
                :
                    null
                }
            </Form>
        </Auxiliary>
    );
}

export default OnlineAuction;
