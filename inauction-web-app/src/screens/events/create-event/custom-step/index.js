import React, { useEffect, useState } from "react";
import Auxiliary from "../../../../util/Auxiliary";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import Section from './Section';
import SectionModal from "./SectionModal";
import uuid from 'uuid/v4';
import '../style.css';
import { NotificationContainer, NotificationManager } from "react-notifications";
import { updateQuestionaireData } from "../../redux/eventActions";

const getAllSectionsWeighting = sections => {
  let result = 0;
  sections.forEach(section => {
    result = result + (+section.weighting);
  });
  return result;
}
const getAllQuestionsWeighting = sections => {
  let result = 0;
  sections.forEach(section => {
    section.questions.forEach(question => {
      result = result + (+question.weighting);
    });
  });
  return result;
}

const CustomStep = props => {
  const [validateFlag, setValidateFlag] = useState(null);
  const [questionnaire, setQuestionnaire] = useState({ ...props.questionnaire });
  useEffect(() => setQuestionnaire({ ...props.questionnaire }), [props.questionnaire]);

  const handleChangeQuestionnaire = (propertyName, propertyValue) => {
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire[propertyName] = propertyValue;
    setQuestionnaire(newQuestionnaire);
    if (propertyName === 'title') props.updateStepTitle(propertyValue);
  }

  const addSection = () => {
    setValidateFlag(null)
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire.sections.push({
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
    });
    setQuestionnaire(newQuestionnaire);
  }

  const updateSection = (propertyName, propertyValue, sectionIndex) => {
    const newQuestionnaire = { ...questionnaire };
    const newSection = { ...newQuestionnaire.sections[sectionIndex] };
    newSection[propertyName] = propertyValue;
    newQuestionnaire.sections[sectionIndex] = newSection;
    setQuestionnaire(newQuestionnaire);
  }

  const removeSection = sectionIndex => {
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire.sections.splice(sectionIndex, 1);
    setQuestionnaire(newQuestionnaire);
  }

  const addQuestion = sectionIndex => {
    setValidateFlag(null)
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire.sections[sectionIndex].questions.push({
      id: uuid(),
      name: undefined,
      description: undefined,
      value: undefined,
      weighting: 0,
    });
    setQuestionnaire(newQuestionnaire);
  }

  const updateQuestion = (propertyName, propertyValue, sectionIndex, questionIndex) => {
    const newQuestionnaire = { ...questionnaire };
    const newQuestion = { ...newQuestionnaire.sections[sectionIndex].questions[questionIndex] };
    newQuestion[propertyName] = propertyValue;
    newQuestionnaire.sections[sectionIndex].questions[questionIndex] = newQuestion;
    setQuestionnaire(newQuestionnaire);
  }

  const removeQuestion = (sectionIndex, questionIndex) => {
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire.sections[sectionIndex].questions.splice(questionIndex, 1);
    setQuestionnaire(newQuestionnaire);
  }

  const finish = () => {
    setValidateFlag(new Date().getTime())
    if (areFieldsInvalid()) return;

    const { event, questionnaires } = props.draftEvent;

    if (event) {
      questionnaire.eventid = event.id;
    }
    if (questionnaires.length > props.questionnaireIndex) {
      questionnaire.id = questionnaires[props.questionnaireIndex].id;
    }
    console.log('questionnaire ', questionnaire);
    props.updateQuestionaireData(questionnaire)
      .then((data) => {
        console.log('update questionnaire ', data);
        setValidateFlag(null)
        props.updateQuestionnaire(questionnaire);
        props.next();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const areFieldsInvalid = () => {
    if (areAnyFieldsEmpty()) {
      // NotificationManager.error('Please fill all the values', 'Error', 3000);
      return true;
    }
    if (questionnaire.weighting_type == 1 && allSectionsWeighting < 100) {
      NotificationManager.error('The sum of all sections weighting must be 100%', 'Error', 3000);
      return true;
    }
    if (questionnaire.weighting_type == 2 && allQuestionsWeighting < 100) {
      NotificationManager.error('The sum of all questions weighting must be 100%', 'Error', 3000);
      return true;
    }
    if (questionnaire.weighting_type == 3 && allSectionsWeighting < 100) {
      NotificationManager.error('The sum of sections weightings must be 100%', 'Error', 3000);
      return true;
    }
    if (questionnaire.weighting_type == 3 && areSectionQuestionsWeightingInvalid()) {
      NotificationManager.error('The sum of questions weightings inside a section must be 100%', 'Error', 3000);
      return true;
    }
    return false;
  }
  const areAnyFieldsEmpty = () => {
    if (questionnaire.title == undefined
      || questionnaire.title == ''
      || questionnaire.deadline == undefined
    ) return true;
    for (let section of questionnaire.sections) {
      if (section.sectionName == undefined
        || section.sectionName == ''
        || section.sectionDescription == undefined
        || section.sectionDescription == ''
        || (questionnaire.weighting_type != 0 && section.weighting == undefined)
      ) return true;
      for (let question of section.questions) {
        if (question.name == undefined
          || question.name == ''
          || question.description == undefined
          || question.description == ''
          || areScoringPointsInvalid(question.score_max_points)
          || isValueInvalid(question.value)
          || (questionnaire.weighting_type != 0 && question.weighting == undefined)
        ) return true;
      }
    }
    return false;
  }
  const areScoringPointsInvalid = score_max_points => {
    if (!questionnaire.has_scoring) return false;
    return (score_max_points == undefined || score_max_points == '');
  }
  const isValueInvalid = value => {
    if (value == undefined) return true;
    if (value.type === 'DOCUMENT_UPLOAD') return false;
    const { type, options } = value;
    if (type === 'PARAGRAPH_TEXT') {
      if (value.maxNumberOfCharacters == undefined) return true;
      return false;
    }
    for (let option of options) {
      const { label, score } = option;
      if (label == undefined || label == '') return true;
      if (score == undefined || score == '') return true;
    }
    return false;
  }
  const areSectionQuestionsWeightingInvalid = () => {
    for (let section of questionnaire.sections) {
      let totalWeighting = 0;
      section.questions.forEach(question => totalWeighting += (+question.weighting));
      if (totalWeighting < 100) return true;
    }
    return false;
  }

  const allSectionsWeighting = getAllSectionsWeighting(questionnaire.sections);
  const allQuestionsWeighting = getAllQuestionsWeighting(questionnaire.sections);

  return (
    <Auxiliary>
      <Section
        questionnaire={questionnaire}
        handleChangeQuestionnaire={handleChangeQuestionnaire}
      />
      {questionnaire.sections.map((item, index) => (
        <SectionModal
          section={item}
          sectionIndex={index}
          questionnaire={questionnaire}
          updateSection={updateSection}
          removeQuestionnaireSection={removeSection}
          addQuestionInSection={addQuestion}
          updateQuestion={updateQuestion}
          removeQuestionInSection={removeQuestion}
          allSectionsWeighting={allSectionsWeighting}
          allQuestionsWeighting={allQuestionsWeighting}
          validateFormFlag={validateFlag}
        />
      ))}
      <hr />
      <div className="steps-action" style={{ float: "left" }}>
        <Button
          type="primary"
          style={{ marginLeft: 2 }}
          onClick={addSection}
        >
          New Section
        </Button>
      </div>
      <div className={"second-step-action"} style={{ float: "right" }}>
        <Button style={{ marginLeft: 8 }} onClick={props.previous}>
          Previous
        </Button>
        <Button type="primary" onClick={finish}>
          Save & Next Step
        </Button>
      </div>
      <NotificationContainer />
    </Auxiliary>
  );
}

const mapStateToProps = ({ authNew, events, errors }) => {
  const { draftEvent } = events;
  return { authNew, errors, draftEvent }
};

export default connect(mapStateToProps, {
  updateQuestionaireData
})(CustomStep);
