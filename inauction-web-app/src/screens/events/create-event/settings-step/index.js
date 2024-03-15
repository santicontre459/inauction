import React, { useEffect, useState } from "react";
import { Checkbox, Input, InputNumber, Radio, Row, Col, Select, Form, Button } from "antd";
import Auxiliary from "../../../../util/Auxiliary";
import { getCurrencies, draftEvent } from "./redux/actions";
import { setDraftEvent } from "../../redux/eventActions";
import { connect } from "react-redux";
import Questionnaire from "./questionnaire";
import RFQ from "./rfq";
import OnlineAuction from "./onlineAuction";
import '../style.css';
import uuid from 'uuid/v4';
import { eventTypes } from '../Constants';
import { NotificationContainer, NotificationManager } from "react-notifications";

const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const Settings = ({
  settingsStep,
  getCurrencies,
  draftEvent,
  setDraftEvent,
  categoryStep,
  setSettingsFields,
  previous,
  next,
  allFormValues,
  allQuestionnaires,
}) => {

  const { currencies } = settingsStep;
  const [form] = Form.useForm();
  const [rfqForm] = Form.useForm();
  const [oaForm] = Form.useForm();
  const [questionnaires, setQuestionnaires] = useState([...allQuestionnaires]);
  const [eventType, setEventType] = useState(eventTypes.NONE);
  const [defineBudget, setDefineBudget] = useState(false);
  const [onlineAuctionEventType, setOnlineAuctionEventType] = useState();
  const [rfqEventType, setRfqEventType] = useState();

  useEffect(() => {
    const getCurr = async () => await getCurrencies();
    getCurr();
  }, []);

  const toggleQuestionnaire = e => {
    if (e.target.checked) addQuestionnaire();
    else setQuestionnaires([]);
  }

  const addQuestionnaire = () => {
    let newQuestionnaires = [...questionnaires];
    newQuestionnaires.push({
      questionnaireId: uuid(),
      title: undefined,
      deadline: undefined,
      has_scoring: false,
      has_weighting: false,
      weighting: 100,
      weighting_type: 0,
      in_event_result_calculation: false,
      pre_qualification: false,
      sections: [{
        id: uuid(),
        sectionName: undefined,
        sectionDescription: undefined,
        weighting: 0,
        questions: [{
          id: uuid(),
          name: undefined,
          description: undefined,
          value: undefined,
          weighting: 0,
        }]
      }]
    });
    setQuestionnaires(newQuestionnaires);
  }

  const removeQuestionnaire = id => {
    const newQuestionnaires = questionnaires.filter(item => item.questionnaireId !== id);
    setQuestionnaires(newQuestionnaires);
  }

  const handleChangeQuestionnaire = (propertyName, propertyValue, id) => {
    const newQuestionnaires = [...questionnaires];
    const elementIndex = newQuestionnaires.findIndex(item => item.questionnaireId === id);
    let questionnaireSelected = newQuestionnaires[elementIndex];
    questionnaireSelected[propertyName] = propertyValue;
    if (propertyName === 'weighting_type') questionnaireSelected.has_weighting = propertyValue != null && propertyValue != 0;
    newQuestionnaires[elementIndex] = questionnaireSelected;
    setQuestionnaires(newQuestionnaires);
  }

  const toggleEventType = (checked, type) => {
    if (!checked) {
      clearEventType();
      return;
    }
    setEventType(type);
    if (type === eventTypes.RFQ) setOnlineAuctionEventType(undefined);
    if (type === eventTypes.OA) setRfqEventType(undefined);
  }
  const clearEventType = () => {
    setEventType(eventTypes.NONE);
    setOnlineAuctionEventType(undefined);
    setRfqEventType(undefined);
  }

  const onFormChange = value => {
    const fullPropName = Object.keys(value)[0];
    if (!fullPropName.includes('questionnaire')) return;
    const questionnaireId = fullPropName.substring(14, 50);
    const propName = fullPropName.substring(51);
    const propValue = value[Object.keys(value)];
    handleChangeQuestionnaire(propName, propValue, questionnaireId);
  }

  const handleChangeRFQ = (propertyName, propertyValue) => {
    const newRfq = { ...rfqEventType };
    newRfq[propertyName] = propertyValue;
    setRfqEventType(newRfq);
  }

  const handleChangeOnlineAuction = (propertyName, propertyValue) => {
    const newOnlineAuction = { ...onlineAuctionEventType };
    newOnlineAuction[propertyName] = propertyValue;
    setOnlineAuctionEventType(newOnlineAuction);
  }

  const onFinish = async formValues => {
    if (await areFieldsInvalid()) return;
    const values = getEventMainValues(formValues);

    console.log('before questionnaires ' , questionnaires)
    draftEvent(categoryStep, values, eventType, questionnaires, rfqEventType, onlineAuctionEventType)
      .then((data) => {
        setDraftEvent(data);
        onSucces(values, formValues);
      })
      .catch(error => {
        showError(error.message);
      });
  }

  const areFieldsInvalid = async () => {
    if (questionnaires.length === 0 && eventType === eventTypes.NONE) {
      showError('You need to fill at least one questionnaire, request for quote or online auction!');
      return true;
    }
    try {
      await rfqForm.validateFields();
      await oaForm.validateFields();
    } catch (err) {
      return true;
    }
    if (questionnaires.length > 0 && eventType === eventTypes.NONE && hasWeighting()) {
      showError('Uncheck Has Weighting or create RFQ or OA');
      return true;
    }
  }
  const hasWeighting = () => {
    const weighting_type = form.getFieldValue('weighting_type');
    return weighting_type != null && weighting_type != 0;
  }

  const getEventMainValues = formValues => {
    let values = {
      name: formValues.name,
      description: formValues.description,
      currency: formValues.currency,
      number_of_experts: formValues.number_of_experts,
      define_budget: formValues.define_budget,
    }
    if (defineBudget) values['total_budget'] = formValues.total_budget;
    return values;
  }

  const onSucces = (fields, allFormValues) => {
    setSettingsFields(fields, eventType, questionnaires, rfqEventType, onlineAuctionEventType, allFormValues);
    NotificationManager.success('Event has been saved as draft', 'Success', 1500);
    setTimeout(next, 1500);
  }

  const showError = message => {
    NotificationManager.error(message, 'Error', 3000);
  }

  return (
    <Auxiliary>
      <Form
        form={form}
        name="EventSettings"
        initialValues={allFormValues}
        onValuesChange={onFormChange}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Event name"
          name="name"
          rules={[{ required: true, message: 'Please input event name!' }]}
        >
          <Input placeholder='Enter event name' />
        </Form.Item>
        <Form.Item
          label="Event description"
          name="description"
          rules={[{ required: true, message: 'Please input event description!' }]}
        >
          <TextArea placeholder='Enter description' rows={2} />
        </Form.Item>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: 'Please select currency!' }]}
        >
          <Select
            showSearch
            style={{ "width": "100%" }}
            placeholder="Choose Event Default Currency"
            getPopupContainer={trigger => trigger.parentNode}
          >
            {currencies && currencies.map(currency =>
              <Option key={currency.id} value={currency.id}>
                {currency.slug + ' ' + currency.title}
              </Option>
            )}
          </Select>
        </Form.Item>
        <Row style={{ flexDirection: "row", paddingBottom: '16px' }} gutter={[16, 0]}>
          <Col span={8}>
            <Form.Item
              label="Number of experts"
              name="number_of_experts"
              rules={[{ required: true, message: 'Please input number of experts!' }]}
            >
              <InputNumber
                type="number"
                min={0}
                placeholder="How many?"
                style={{ "width": "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ textAlign: 'center' }}>Define budget</span>}
              name="define_budget"
            >
              <RadioGroup onChange={e => setDefineBudget(e.target.value)}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </Form.Item>
          </Col>
          <Col span={8}>
            {defineBudget &&
              <Form.Item
                label="Total Budget"
                name="total_budget"
                rules={[{ required: true, message: 'Please input total budget!' }]}
              >
                <InputNumber
                  type="number"
                  min={0}
                  placeholder="How much?"
                  style={{ "width": "100%" }}
                />
              </Form.Item>
            }
          </Col>
        </Row>
        <hr />
        <span className="ant-card-head-title create-event-head-title input-section-vertical">
          Questionnaire
        </span>
        <Checkbox
          className="checkbox-padding"
          checked={questionnaires.length > 0}
          onChange={toggleQuestionnaire}
        >
          {'I want a questionnaire'}
        </Checkbox>

        <div className="questionnaire-divider" />

        {questionnaires.map(item =>
            <Questionnaire
              questionnaire={item}
              removeQuestionnaire={removeQuestionnaire}
            />
        )}
      </Form>

      {questionnaires.length > 0 &&
        <>
          <Checkbox
            onChange={e => addQuestionnaire()}
            checked={false}
          >
            <span className="create-event-labels">DO YOU WANT TO ADD ANOTHER QUESTIONNAIRE?</span>
          </Checkbox>
          <hr className="questionnaire-divider" />
        </>
      }

      <span className="ant-card-head-title create-event-head-title">Event type</span>
      <div className="checkbox-padding">
        <div className="input-section-vertical">
          <Checkbox
            value={eventTypes.RFQ}
            checked={eventType === eventTypes.RFQ}
            onChange={e => toggleEventType(e.target.checked, eventTypes.RFQ)}
          >
            Do you want a RFQ?
          </Checkbox>
        </div>
        <div className="input-section-vertical">
          <Checkbox
            value={eventTypes.OA}
            checked={eventType === eventTypes.OA}
            onChange={e => toggleEventType(e.target.checked, eventTypes.OA)}
          >
            Do you want an online auction?
          </Checkbox>
        </div>
      </div>
      {eventType === eventTypes.RFQ &&
        <RFQ
          form={rfqForm}
          rfqEventType={rfqEventType}
          questionnaires={questionnaires}
          handleChangeRFQ={handleChangeRFQ}
          handleChangeQuestionnaire={handleChangeQuestionnaire}
        />
      }
      {eventType === eventTypes.OA &&
        <OnlineAuction
          form={oaForm}
          onlineAuctionEventType={onlineAuctionEventType}
          questionnaires={questionnaires}
          handleChangeOnlineAuction={handleChangeOnlineAuction}
          handleChangeQuestionnaire={handleChangeQuestionnaire}
        />
      }

      <div className={"second-step-action"} style={{ float: "right" }}>
        <Button style={{ marginLeft: 8 }} onClick={previous}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit" form='EventSettings'>
          Save & Next Step
        </Button>
      </div>

      <NotificationContainer />

    </Auxiliary>
  );
}

const mapStateToProps = ({ createEvent }) => {
  return {
    settingsStep: createEvent.settingsStep,
  }
};
const mapDispatchToProps = {
  getCurrencies,
  draftEvent,
  setDraftEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
