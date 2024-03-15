import React, { useEffect, useState } from "react";
import { Card, List, Radio, Button } from "antd";
import CircularProgress from "../../../../../components/CircularProgress";
import RadioButtonQuestion from "./radioButtonQuestion";
import SelectQuestion from "./selectQuestion";
import CheckBoxQuestion from "./checkBoxQuestion"
import TextAreaQuestion from "./textAreaQuestion";
import UploadQuestion from "./uploadQuestion";
import data from "../../data"
import { getQuestionairDetails } from '../../../../../redux/actions/eventActions';
import { QuestionsType } from "../../../../../constants/Constants";

const questionnaireNames = Object.keys(data.questionnaires);

const Questionnaire = (props) => {
    const [questionaires, setQuestionaires] = useState([]);
    const [qData, setQData] = useState(null);
    const [state, setState] = useState({
        details: null,
        loading: false,
    });

    useEffect(() => {
        if (props.data.questionNaires && props.data.questionNaires.length > 0) {
            if (qData == null) {
                setQData(props.data.questionNaires[0]);
            }
        }
    }, [props.data]);

    useEffect(() => {
        if (qData?.id) {
            let index = questionaires.findIndex(q => q.id == qData?.id);
            if (index != -1) {
                setState({
                    details: questionaires[index],
                    loading: false,
                })
            }
            else {
                setState({
                    details: null,
                    loading: true,
                })
                getQuestionairDetails(qData?.id).then(res => {
                    console.log('getQuestionairDetails ', res);
                    setQuestionaires(pre => [].concat(pre, [res]));
                    setState({
                        details: res,
                        loading: false,
                    })
                })
                    .catch(err => {
                        console.log('getQuestionairDetails ', err);
                        setState({
                            details: null,
                            loading: false,
                        })
                    })
            }
        }
    }, [qData]);

    const handleChange = (e) => {
        const value = e.target.value;
        let index = props.data.questionNaires.findIndex(q => q.id == value);
        if (index != -1) {
            setQData(props.data.questionNaires[index]);
        }
    };

    const popQuestionsToRender = (questions) => {
        const questionnaireToRender = [];
        questions.map((item) => {
            switch (item.type) {
                case QuestionsType.YES_NO:
                    questionnaireToRender.push(<RadioButtonQuestion title={item.title} answers={item.question_options || []} />);
                    break;
                case QuestionsType.ONE_CHOICE:
                    questionnaireToRender.push(<SelectQuestion title={item.title} answers={item.question_options || []} />);
                    break;
                case QuestionsType.MULTI_CHOICE:
                    questionnaireToRender.push(<CheckBoxQuestion title={item.title} answers={item.question_options || []} />);
                    break;
                case QuestionsType.DOCUMENT_UPLOAD:
                    questionnaireToRender.push(<UploadQuestion title={item.title} answers={item.question_options || []} />);
                    break;
                case QuestionsType.PARAGRAPH_TEXT:
                    questionnaireToRender.push(<TextAreaQuestion title={item.title} answers={item.question_options || []} />);
                    break;
                default:
                    break;
            }
        });
        return questionnaireToRender;
    };

    const _renderSection = (section) => {
        if (section && section.questions != null && section.questions.length > 0) {
            return <div>
                <div className="section-title gx-mt-2">{section.title}</div>
                <div className="gx-mt-2">{section.description}</div>
                <List className="gx-mb-4 gx-mt-2"
                    bordered
                    dataSource={popQuestionsToRender(section.questions)}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>
        }
        return <></>
    }

    return (
        <Card title="Questionnaires" className={"gx-card user-profile-gx-card input-form-border all-events-card"}
            style={{ minHeight: "97.5%" }}>
            <span className="gx-media-event-details">
                {/*<IntlMessages id=""/>*/} Below you can find the questionnaires.
            </span>
            <div className="ant-row-flex gx-justify-content-between gx-mb-3 user-profile-gx-media-card questions-tabs"
                style={{ paddingTop: "16px" }}>
                <Radio.Group className="gx-radio-group-link gx-radio-group-link-news"
                    value={qData?.id}
                    onChange={handleChange}>
                    {
                        props.data.questionNaires.map((item) => {
                            return <Radio.Button value={item.id} className="gx-mb-1">{item.title}</Radio.Button>
                        })
                    }
                </Radio.Group>
                {
                    qData?.deadline ?
                        (<span><b>  Deadline : </b> {qData?.deadline}</span>) : null
                }
            </div>
            {state.loading ? <CircularProgress className="gx-loader-400" />
                :
                state.details != null && state.details.sections != null &&
                state.details.sections.map(section =>
                    _renderSection(section)
                )
            }
            <div className="ant-row-flex gx-justify-content-between gx-mb-3" style={{ float: "right" }}>
                <Button type="primary" htmlType="submit" className="ant-btn ant-btn-md">
                    <span> Save and Next </span>
                </Button>
            </div>
        </Card>
    );
}

export default Questionnaire;
