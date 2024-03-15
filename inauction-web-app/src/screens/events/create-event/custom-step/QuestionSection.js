import React, { useEffect } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import Auxiliary from "../../../../util/Auxiliary";
import { Form, Button, Col, Divider, Input, Row, Select, Statistic, Popconfirm, InputNumber } from "antd";
import { questionsType} from '../Constants'
import QuestionType from './QuestionType';
import '../style.css';

const Option = Select.Option;

const Question = ({
    question,
    index,
    questionnaire,
    sectionIndex,
    updateQuestion,
    removeQuestionInSection,
    questionsLength,
    allQuestionsWeighting,
    validateFormFlag
}) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: question.name,
            description: question.description,
            weighting: question.weighting,
            score_max_points: question.score_max_points,
            scoring_method: question.scoring_method,
            value: question.value?.type ?? undefined,
        });
    }, [questionnaire]);

    useEffect(()=>{
		if (validateFormFlag) {
			form.validateFields()
		}
	}, [validateFormFlag])

    const onValuesChange = value => {
        const propName = Object.keys(value)[0];
        const propValue = propName === 'value'
            ? JSON.parse(JSON.stringify({...questionsType[value[Object.keys(value)]]}))
            : value[Object.keys(value)];
        const validatedValue = getValidatedNumberInput(propName, propValue);
        updateQuestion(propName, validatedValue, sectionIndex, index);
    }

    const getValidatedNumberInput = (propName, propValue) => {
        if (propName !== 'weighting') return propValue;
        let newWeighting = +propValue;
        const restOfQuestionsWeighting = allQuestionsWeighting - question.weighting;
        const newAllQuestionsWeighting = restOfQuestionsWeighting + newWeighting;
        if (newAllQuestionsWeighting > 100) newWeighting = 100 - restOfQuestionsWeighting;
        if (newWeighting < 0) newWeighting = 0;
        form.setFieldsValue({ weighting: newWeighting.toString() });
        return newWeighting;
    }

    const deletePopUptitle = questionsLength > 1
        ? "Are you sure you want to delete this question?"
        : "You must have at least one question";

    return (
        <Auxiliary key={question.id}>
            <Divider/>
            <Row gutter={[16, 0]}>
                <Col span={24}>
                    <span style={{"float": "right"}}>
                        <Popconfirm
                            title={deletePopUptitle}
                            onConfirm={() => questionsLength > 1 && removeQuestionInSection(sectionIndex, index)}
                            icon={<QuestionCircleOutlined style={{color: 'red'}} />}
                        >
                            <a><i className="icon icon-trash"/></a>
                        </Popconfirm>
                    </span>
                </Col>
            </Row>
            <Row gutter={[16, 0]}>
                <Col span={24} style={{display: 'inline-flex'}}>
                    <h3 style={{textAlign: "center", flex: 'auto'}}>QUESTION {index + 1}</h3>
                    {(questionnaire.weighting_type === 2 || questionnaire.weighting_type === 3) &&
                        <Statistic
                            style={{float: 'right'}}
                            title="Weight"
                            value={question.weighting}
                            suffix="/ 100%"
                        />
                    }
                </Col>
            </Row>
            <Form
                form={form}
                name={`Question${sectionIndex}`}
                onValuesChange={onValuesChange}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Question Name"
                    rules={[{ required: true, message: 'Please input question name!'}]}
                >
                    <Input placeholder='Enter question name'/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input question description!'}]}
                >
                    <Input placeholder='Enter description'/>
                </Form.Item>
                {(questionnaire.weighting_type === 2 || questionnaire.weighting_type === 3) &&
                    <Form.Item
                        name="weighting"
                        label="Weighting"
                        rules={[{ required: true, message: 'Please select weight!'}]}
                    >
                        <Input
                            addonAfter="%"
                            type="number"
                        />
                    </Form.Item>
                }
                {questionnaire.has_scoring &&
                    <>
                        <Form.Item
                            name="score_max_points"
                            label="Scoring maximum points"
                            rules={[{ required: true, message: 'Please input maximum points!'}]}
                        >
                            <Input type="number" placeholder="Enter scoring maximum points" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="scoring_method"
                            label="Scoring method"
                        >
                            <Input.TextArea placeholder="Enter scoring method" rows={2} />
                        </Form.Item>
                    </>
                }
                <Form.Item
                    name="value"
                    label="Type"
                    rules={[{ required: true, message: 'Please select question type!'}]}
                >
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder='Select type'
                        style={{width: '100%'}}
                    >
                        {Object.keys(questionsType).map(keyName => (
                            <Option value={keyName.toString()}>
                                {questionsType[keyName].label.toString()}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
            {question.value !== undefined &&
                <QuestionType
                    questionType={question.value.type}
                    questionnaire={questionnaire}
                    sectionId={sectionIndex}
                    questionIndex={index}
                    updateQuestion={updateQuestion}
                    maxValue={form.getFieldValue('score_max_points')}
                />
            }
        </Auxiliary>
    )
}

const getQuestionsWeightingPercentage = questions => {
    let result = 0;
    questions.forEach(question => {
      result = result + (+question.weighting);
    });
    return result;
}

const QuestionSection = ({
    questionnaire,
    sectionIndex,
    updateQuestion,
    addQuestionInSection,
    removeQuestionInSection,
    allQuestionsWeighting,
    validateFormFlag
}) => {

    const questions = questionnaire.sections[sectionIndex]?.questions;
    const currentSectionQuestionsWeighting = getQuestionsWeightingPercentage(questions);
    const questionsWeighting = questionnaire.weighting_type === 3
        ? currentSectionQuestionsWeighting
        : allQuestionsWeighting;

    return (
        <Auxiliary>
            {questions?.map((question, index) => (
                <Question
                    key={question.id}
                    question={question}
                    index={index}
                    questionnaire={questionnaire}
                    sectionIndex={sectionIndex}
                    updateQuestion={updateQuestion}
                    removeQuestionInSection={removeQuestionInSection}
                    questionsLength={questions?.length}
                    allQuestionsWeighting={questionsWeighting}
                    validateFormFlag={validateFormFlag}
                />
            ))}
            <div className="steps-action" style={{marginTop: 16}}>
                <Button
                    type="primary"
                    onClick={() => addQuestionInSection(sectionIndex)}
                >
                    New Question
                </Button>
            </div>
        </Auxiliary>
    );
};

export default QuestionSection;
