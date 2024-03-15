import React, { useRef } from "react";
import { Button, Col, Input, Row, Select } from "antd";
import '../style.css';

const Option = Select.Option;

const getMaxValue = (value, maxValue) => {
    if (maxValue == undefined) return value;
    if ((+value) > (+maxValue)) return maxValue;
    return value;
}

const ChooseFromList = ({ questionnaire, sectionId, questionIndex, updateQuestion, maxValue }) => {
    const scoreRef = useRef();
    return (
        <div className="gx-media-body event-type-form-gx-media-body">
            <Row gutter={[16, 0]}>
                <Col span={8}>
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">Answer</span>
                </Col>
                <Col span={7}>
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">Score</span>
                </Col>
                <Col span={7}>
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">Fail</span>
                </Col>
            </Row>
            {questionnaire.sections[sectionId].questions[questionIndex].value.options.map((item, index) => (
                <Row
                    key={'question_value_' + index}
                    style={{marginBottom: "16px"}}
                    gutter={[16, 0]}
                >
                    <Col span={8}>
                        <Input
                            value={item.label}
                            onChange={event => {
                                let questionnaireValue = Object.assign(
                                    {}, questionnaire.sections[sectionId].questions[questionIndex].value);
                                questionnaireValue.options[index].label = event.target.value;
                                updateQuestion('value', questionnaireValue, sectionId, questionIndex);
                            }}
                            placeholder={"Enter Option"}
                            disabled={questionnaire.sections[sectionId].questions[questionIndex].value.type === 'yesNo'}
                        />
                    </Col>
                    <Col span={7}>
                        <Input
                            ref={scoreRef}
                            type='number'
                            value={item.score}
                            onChange={number => {
                                let questionnaireValue = Object.assign(
                                    {}, questionnaire.sections[sectionId].questions[questionIndex].value);
                                    const value = getMaxValue(number.target.value, maxValue);
                                questionnaireValue.options[index].score = value;
                                scoreRef.current.value = value?.toString();
                                updateQuestion('value', questionnaireValue, sectionId, questionIndex);
                            }}
                            style={{width: '100%'}}
                            placeholder='Enter Score'
                        />
                    </Col>
                    <Col span={7}>
                        <Select placeholder='Fail' style={{width: '100%'}}
                            value={item.fail}
                            onChange={value => {
                                let question = {...questionnaire.sections[sectionId].questions[questionIndex]};
                                question.value.options[index].fail = value;
                                updateQuestion('value', question.value, sectionId, questionIndex);
                            }}
                        >
                            <Option value={true}>Yes</Option>
                            <Option value={false}>No</Option>
                        </Select>
                    </Col>
                    {questionnaire.sections[sectionId].questions[questionIndex].value.type !== 'yesNo' &&
                    <Col span={2}>
                        <a
                            onClick={() => {
                                if (questionnaire.sections[sectionId].questions[questionIndex].value.options.length > 1) {
                                    let questionnaireValue = {};
                                    Object.assign(questionnaireValue, questionnaire.sections[sectionId].questions[questionIndex].value);
                                    questionnaireValue.options.splice(index, 1);
                                    updateQuestion('value', questionnaireValue, sectionId, questionIndex);
                                }
                            }}
                        >
                            <i className="icon icon-trash"/>
                        </a>
                    </Col>}
                </Row>
            ))}
            {questionnaire.sections[sectionId].questions[questionIndex].value.type !== 'yesNo' &&
                <div className="steps-action" style={{marginTop: '16px'}}>
                    <Button
                        type="primary"
                        onClick={() => {
                            let question = Object.assign({}, questionnaire.sections[sectionId].questions[questionIndex]);
                            question.value.options = question.value.options.concat({label: '', score: '', fail: false});
                            updateQuestion('value', question.value, sectionId, questionIndex);
                        }}
                    >
                        Add Option
                    </Button>
                </div>
            }
        </div>
    );
};

export default ChooseFromList;
