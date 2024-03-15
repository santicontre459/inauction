import { I2ndQuestionnaire, IDraftQuestionnaire, IQuestionnaire } from "core/models/questionnaire/IQuestionnaire";
import { Request, Response } from 'express';
import { failureResponse } from "../common/handler/responseHandler";
import { ResponseMessages } from "../common/resource/Resource";
import {Event} from "../../schema/event";

export class QuestionnaireControllerHandler {
    public static checkQuestionnaireCreationModel(req: Request) : IQuestionnaire | false   {
        if (
            req.body.title
            && req.body.description
            && req.body.deadline
            && typeof req.body.has_scoring === "boolean"
            && typeof req.body.is_prequalification === "boolean"
            && typeof req.body.has_weighting === "boolean"
            && req.body.eventid
            && req.body.weighting_type
            && req.body.weighting
        ){
            return {
                title: req.body.title,
                description: req.body.description,
                deadline: req.body.deadline,
                hasScoring: req.body.has_scoring,
                hasWeighting: req.body.has_weighting,
                isPrequalification: req.body.is_prequalification,
                inEventResultCalculation: true,
                event: req.body.eventid,
                weightingType: req.body.weighting_type,
                weighting: req.body.weighting,
            };
        } else
            return false;
    }

    public static async checkDraftQuestionnaireCreationModel(questionnaires: any, questionnaireRequest: any, res: Response, draftEvent: Event) : Promise<IDraftQuestionnaire | false>   {
        if (
            questionnaireRequest.title
            && questionnaireRequest.deadline
            && typeof questionnaireRequest.has_scoring === 'boolean'
            && typeof questionnaireRequest.pre_qualification === 'boolean'
            && typeof questionnaireRequest.has_weighting === 'boolean'
            && (questionnaireRequest.weighting_type || questionnaireRequest.weighting_type === 0)
            && questionnaireRequest.weighting
            && typeof questionnaireRequest.in_event_result_calculation === 'boolean'
        ) {

            // check if `weighting_type` is an allowed value
            let weightingTypeAllowed = [0, 1, 2, 3];
            if (!weightingTypeAllowed.includes(questionnaireRequest.weighting_type)) {
                failureResponse(ResponseMessages.incorrectQuestionnaireWeightingType, null, res);
                return false;
            }


            // if `has_weighting` true, weighting type should be one of [1,2,3]
            // if `has_weighting` false, weighting type should be [0]
            if (
                questionnaireRequest.has_weighting && questionnaireRequest.weighting_type === 0
                || !questionnaireRequest.has_weighting && questionnaireRequest.weighting_type !== 0
            ) {
                failureResponse(ResponseMessages.incorrectQuestionnaireWeightingCombinationType, null, res);
                return false;
            }

            // can be only one prequalification
            if (questionnaires.length > 0 && questionnaireRequest.pre_qualification) {
                let sameQuestionnaires = questionnaires.filter(q => q.pre_qualification === true);
                if (sameQuestionnaires.length > 0) {
                    failureResponse(ResponseMessages.questionnaireHasPreQualificationRestriction, null, res);
                    return false;
                }
            }


            return {
                title: questionnaireRequest.title,
                description: questionnaireRequest.description ? questionnaireRequest.description : null,
                deadline: new Date(questionnaireRequest.deadline),
                hasScoring: questionnaireRequest.has_scoring,
                hasWeighting: questionnaireRequest.has_weighting,
                weightingType: questionnaireRequest.weighting_type,
                weighting: questionnaireRequest.weighting,
                isPrequalification: questionnaireRequest.pre_qualification,
                inEventResultCalculation: questionnaireRequest.in_event_result_calculation
            };
        } else
            return false;
    }

    public static checkDraftQuestionnaire2ndModel(req: Request) : I2ndQuestionnaire | false   {
        if( req.body.id
            && req.body.title
            && req.body.deadline
            && typeof req.body.pre_qualification === 'boolean'
            && Array.isArray(req.body.sections)
        ){
            return {
                id: req.body.id,
                title: req.body.title,
                deadline: new Date(req.body.deadline),
                isPrequalification: req.body.pre_qualification,
                sections: req.body.sections,
            };
        } else
            return false;
    }
}
