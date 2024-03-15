import React from "react";
import ChooseFromList from './ChooseFromList';
import TextArea from './TextArea';

const QuestionType = ({ questionType, questionnaire, sectionId, questionIndex, updateQuestion, maxValue }) => {
    switch (questionType) {
        case 'YES_NO':
            return (
                <ChooseFromList
                    questionnaire={questionnaire}
                    sectionId={sectionId}
                    questionIndex={questionIndex}
                    updateQuestion={updateQuestion}
                    maxValue={maxValue}
                />
            );
        case 'ONE_CHOICE':
            return (
                <ChooseFromList
                    questionnaire={questionnaire}
                    sectionId={sectionId}
                    questionIndex={questionIndex}
                    updateQuestion={updateQuestion}
                    maxValue={maxValue}
                />
            );
        case 'MULTI_CHOICE':
            return (
                <ChooseFromList
                    questionnaire={questionnaire}
                    sectionId={sectionId}
                    questionIndex={questionIndex}
                    updateQuestion={updateQuestion}
                    maxValue={maxValue}
                />
            );
        case 'PARAGRAPH_TEXT':
            return (
                <TextArea
                    questionnaire={questionnaire}
                    sectionId={sectionId}
                    questionIndex={questionIndex}
                    updateQuestion={updateQuestion}
                />
            );
        default:
            return '';
    }
};

export default QuestionType;
