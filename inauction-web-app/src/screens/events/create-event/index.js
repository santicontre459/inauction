import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Card, Steps } from "antd";
import { Helmet} from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { NotificationContainer } from "react-notifications";
import { steps } from "./Constants"
import CategoryContent from "./category-step";
import SettingsContent from "./settings-step";
import CustomStep from "./custom-step";
import DocumentContent from "./document-step";
import LotsContent from "./lots-step";
import InviteContent from "./invite-step";
import "./../Index.css";
import {connect} from "react-redux";
import { addEvent, getUOMs } from "../redux/eventActions";
import Can from "../../../components/RoleBasedAccessControl/Can";
import returnPermission from "../../../util/returnPermission";
import { Redirect } from 'react-router-dom';

const customer = JSON.parse(localStorage.getItem('jwtUser'));
const Step = Steps.Step;

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: steps.map(e => e),
      categoryFields: {
        category: undefined,
        activity: undefined
      },
      settingsFields: undefined,
      questionnaires: [],
      documents: [],
      lotFields: {
        lotType: undefined,
        lots: [{ lotName: '', data: [] }],
      },
      settingsStepFormValues: undefined,
    };
  }

  componentDidMount(){
    this.props.getUOMs('host');
  }

  goToNextStep = () => {
    const nextStep = this.state.current + 1;
    if (nextStep === 2) {
      const newSteps = this.createNewSteps();
      this.setState({ steps: newSteps });
    }
    this.setState({ current: nextStep });
  }
  createNewSteps = () => {
    let theSteps = this.state.steps;
    this.state.questionnaires.forEach((item, index) => {
      let itmStep = { "title": item.title, "content": `custom_step_${index}` };
      theSteps.splice(2 + index, 0, itmStep);
    });
    if (this.state.settingsFields.rfqEventType != null) {
      let itmStep = { title: "Bill of Quantities", content: "lots-content" };
      const objIndex = this.state.steps.findIndex(item => item.title === 'Submit');
      theSteps.splice(objIndex, 0, itmStep);
    }
    return theSteps;
  }

  goToPreviousStep = () => {
    const stepPrevious = this.state.current - 1;
    this.setState({ current: stepPrevious });
    if (stepPrevious === 1) {
      let theSteps = steps.map(e => e);
      //theSteps.splice(2, this.state.settings.questionnaire.length);
      this.setState({steps: theSteps});
    }
  }

  updateCurrentStep = newTitle => {
    const { steps, current } = this.state;
    const newSteps = [ ...steps ];
    newSteps[current].title = newTitle;
    this.setState({ steps: newSteps });
  }

  setCategoryFields = fields => {
    this.setState({ categoryFields: fields });
  }

  setSettingsFields = (fields, eventType, questionnaires, rfqEventType, onlineAuctionEventType, formValues) => {
    this.setState({   
      settingsFields: {
        fields: fields,
        eventType: eventType,
        rfqEventType: rfqEventType,
        onlineAuctionEventType: onlineAuctionEventType,
      },
      questionnaires: questionnaires,
      settingsStepFormValues: formValues,
    });
  }

  updateQuestionnaire = questionnaire => {
    const newQuestionnaires = [ ...this.state.questionnaires ];
    const index = newQuestionnaires.findIndex(item => item.questionnaireId === questionnaire.questionnaireId);
    newQuestionnaires[index] = questionnaire;
    this.setState({ questionnaires: newQuestionnaires });
    console.log('all questionnaires: ', newQuestionnaires);
  }

  setDocuments = documents => {
    console.log('documents: ', documents);
    this.setState({ documents: documents });
  }

  setLotFields = lotFields => {
    console.log(lotFields);
    this.setState({ lotFields: lotFields });
  }

  render() {
    const { steps, current } = this.state;
    const curretStepContent = steps[current].content;

    return (
      <Can
        role={returnPermission(this.props.authNew.user)}
        perform="event:create"
        yes={() => (
          <Auxiliary>
            <Helmet>
              <title>iNauction Tool | {customer.subrole.description} | Create Event</title>
            </Helmet>
            <Breadcrumbs description={"Events - Create Event"} name={"Create Event"}/>
            <Card
              title="Create a new Event"
              className="gx-card create-event-gx-card activity-form-gx-card input-form-border card-padding"
            >
              <span className="gx-media-create-event">
                Complete all the required steps to create and publish the event
              </span>
              <Steps className="create-event-steps" current={current}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
              </Steps>
              {curretStepContent === "category-content" &&
                <CategoryContent
                  categoryStepFields={this.state.categoryFields}
                  setCategoryFields={this.setCategoryFields}
                  next={this.goToNextStep}
                />
              }
              {curretStepContent === "settings-content" &&
                <SettingsContent
                  categoryStep={this.state.categoryFields}
                  setSettingsFields={this.setSettingsFields}
                  allFormValues={this.state.settingsStepFormValues}
                  allQuestionnaires={this.state.questionnaires}
                  next={this.goToNextStep}
                  previous={this.goToPreviousStep}
                />
              }
              {curretStepContent.includes("custom_step") &&
                <CustomStep
                  questionnaireIndex={+curretStepContent.substring(12)}
                  questionnaire={this.state.questionnaires[+curretStepContent.substring(12)]}
                  updateQuestionnaire={this.updateQuestionnaire}
                  updateStepTitle={this.updateCurrentStep}
                  next={this.goToNextStep}
                  previous={this.goToPreviousStep}
                />
              }
              {curretStepContent === "document-content" &&
                <DocumentContent
                  setDocuments={this.setDocuments}
                  next={this.goToNextStep}
                  previous={this.goToPreviousStep}
                />
              }
              {curretStepContent === "lots-content" &&
                <LotsContent
                  currency={this.state.settingsFields.fields.currency}
                  setLots={this.setLotFields}
                  next={this.goToNextStep}
                  previous={this.goToPreviousStep}
                />
              }
              {curretStepContent === "invite-content" &&
                <InviteContent
                  previous={this.goToPreviousStep}
                  history={this.props.history}
                />
              }
            </Card>
            <NotificationContainer/>
          </Auxiliary>
        )}
        no={() => <Redirect exact to={`/dashboard`}/>}
      />
    );
  }
}

const mapStateToProps = ({authNew, events}) => {
  return {authNew, events}
};

export default connect(mapStateToProps, {addEvent, getUOMs})(CreateEvent);
