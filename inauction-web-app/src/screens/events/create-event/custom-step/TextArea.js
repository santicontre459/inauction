import React from "react";
import { Col,Input,InputNumber, Row } from "antd";
import '../style.css';

const TextArea = ({ questionnaire, sectionId, questionIndex, updateQuestion }) => {

    const onChange = event => {
        let questionnaireValue = Object.assign({}, questionnaire.sections[sectionId].questions[questionIndex].value);
        questionnaireValue.maxNumberOfCharacters = event.target.value;
        updateQuestion('value', questionnaireValue, sectionId, questionIndex)
    }

    return (
        <div className="gx-media gx-align-items-center gx-flex-nowrap">
            <div className="gx-media-body event-type-form-gx-media-body">
            <Row gutter={[16, 0]}>
                <Col span={12}>
                    <span className="gx-mb-0 ant-form-item-label gx-fs-md">
                        <span>Maximum number of characters</span>
                        <span className="required-label-dot">*</span>
                    </span>
                </Col>
                <Col span={12}>
                    <Input 
                        type={'number'}
                        style={{width: '100%'}}
                        defaultValue={questionnaire.sections[sectionId].questions[questionIndex].value.maxNumberOfCharacters}
                        onChange={onChange}
                        placeholder='Max number of chars'
                    />
                </Col>
            </Row>
            </div>
        </div>
    );
};

export default TextArea;
