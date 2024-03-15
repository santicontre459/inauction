import { IDraftEvent } from "core/models/event/IEvent";
import { EventProgressStatus } from "../../schema/event";
import { Request, Response } from 'express';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { getRepository } from "typeorm";
import { Currency } from "../../schema/currency";
import { Activity } from "../../schema/activity";
import { EventCategory } from "../../schema/eventCategory";
import { failureResponse } from "../common/handler/responseHandler";
import { ResponseMessages } from "../common/resource/Resource";
import { isEmpty } from "class-validator";
import UserRepository from '../../../core/repository/user/userRepository';
import { User } from './../../schema/user';

export class EventControllerHandler {

    public static async checkEventDraftCreationModel(req: Request, res: Response) : Promise<IDraftEvent | false>  {

        const currencyRepository = getRepository(Currency);
        const activityRepository = getRepository(Activity);
        const eventCategoryRepository = getRepository(EventCategory);
        let userRepository  = new UserRepository(User);

        // get request user id in order to determine task creator
        const requestUser = AuthorizationCheck.getCurrentUser(req);

        console.log('draft ====================================')
        console.log(req.body)
        if (
            req.body.currency
            && req.body.activity
            && req.body.name
            && req.body.description
            && (req.body.number_of_experts || req.body.number_of_experts === 0)
            && typeof req.body.define_budget === "boolean"
            && (req.body.event_type || req.body.event_type === 0) // rfq or oa or none
            && req.body.event_category
            && typeof req.body.has_questionnaire === "boolean"
        ) {

            const hasCompany = await userRepository.hasCompany(requestUser);
            console.log('draft 1 ====================================')
            if (!hasCompany) return false;

            let eventTypesAllowed = [0, 1, 2];
            if (!eventTypesAllowed.includes(req.body.event_type)) {
                failureResponse(ResponseMessages.eventTypeDoesNotExist, null, res);
                return false;

            }

            if (req.body.define_budget && !req.body.total_budget) {
                failureResponse(ResponseMessages.eventBudgetRequired, null, res);
                return false;
            }

            // currency, currency, eventCategory
            let currency = await currencyRepository.findOne(
                req.body.currency, {
                    where : {
                        isDeleted: false,
                        status: 1
                    }
                }
            );

            let activity = await activityRepository.findOne(
                req.body.activity, {
                    where : {
                        isDeleted: false,
                        status: 1
                    }
                }
            );

            let eventCategory = await eventCategoryRepository.findOne(
                req.body.event_category, {
                    where : {
                        isDeleted: false,
                        status: 1
                    }
                }
            );

            if (isEmpty(currency)) {
                failureResponse(ResponseMessages.currencyDoesNotExist, null, res);
                return false;
            }

            if (isEmpty(activity)) {
                failureResponse(ResponseMessages.activityDoesNotExist, null, res);
                return false;
            }

            if (isEmpty(eventCategory)) {
                failureResponse(ResponseMessages.eventCategoryDoesNotExist, null, res);
                return false;
            }

            /**
             * Check for event creation combination
             * Combinations Allowed
             * 1. Questionnaire
             * 2. RFQ
             * 3. RFQ + Questionnaire
             * 4. OA
             * 5. OA + Questionnaire
             */

            if (!req.body.has_questionnaire && req.body.event_type === 2) {
                failureResponse(ResponseMessages.eventChooseType, null, res);
                return false;
            }

            // if `has_questionnaire` is true, at least one questionnaire should be provided
            if (req.body.has_questionnaire && (!req.body.questionnaires || req.body.questionnaires.length === 0)) {
                failureResponse(ResponseMessages.eventAtLeastOneQuestionnaire, null, res);
            }

            // if `event_type` === 0 (RFQ), check if RFQ requested fields are provided
            if (req.body.event_type === 0 && (!req.body.rfq_request)) {
                failureResponse(ResponseMessages.draftEventProvideRFQDetails, null, res);
            }

            // if `event_type` === 1 (OA), check if OA requested fields are provided
            if (req.body.event_type === 1 && (!req.body.oa_request)) {
                failureResponse(ResponseMessages.draftEventProvideOADetails, null, res);
            }

            // 0 or 1 questionnaires can be in_event_result_calculation when the event type is either OA or RFQ
            if (
                req.body.has_questionnaire
                && req.body.questionnaires
                && req.body.questionnaires.length > 0
                && req.body.event_type !== 2
            ) {

                let inEventResultQuestionnaires =
                    req.body.questionnaires.filter(q => q.in_event_result_calculation === true);
                if (inEventResultQuestionnaires.length > 1 ) {
                    failureResponse(ResponseMessages.incorrectQuestionnaireEventScoreCalculation, null, res);
                }
            }

            // if rfq has `has_questionnaire_in_score` flag to true, then at least one questionnaire should have
            // `in_event_result_calculation` and `has_score` flags to true
            if (
                req.body.has_questionnaire
                && req.body.event_type === 0
                && req.body.rfq_request.has_questionnaire_in_score) {

                let hasScoreQuestionnaires =
                    req.body.questionnaires.filter(q =>
                        q.in_event_result_calculation === true
                        && q.has_scoring === true
                    );

                if (hasScoreQuestionnaires.length !== 1) {
                    failureResponse(ResponseMessages.incorrectQuestionnaireHasScoreNumber, null, res);
                }

            }

            // if oa has `has_questionnaire_in_score` flag to true, then at least one questionnaire should have
            // `in_event_result_calculation` and `has_score` flags to true
            if (
                req.body.has_questionnaire
                && req.body.event_type === 1
                && req.body.oa_request.has_questionnaire_in_score) {

                let hasScoreQuestionnaires =
                    req.body.questionnaires.filter(q =>
                        q.in_event_result_calculation === true
                        && q.has_scoring === true
                    );

                if (hasScoreQuestionnaires.length !== 1) {
                    failureResponse(ResponseMessages.incorrectQuestionnaireHasScoreNumber, null, res);
                }

            }



            return {
                host: requestUser,
                activity: await activity,
                title: req.body.name,
                description: req.body.description,
                currency: await currency,
                expertsNumber: req.body.number_of_experts,
                defineBudget: req.body.define_budget,
                totalBudget: req.body.define_budget ? req.body.total_budget : null,
                eventType: req.body.event_type,
                progressStatus: EventProgressStatus.DRAFT,
                eventCategory: await eventCategory,
                referenceNumber: this.generateEventReferenceNumber(6),
                hasQuestionnaire: req.body.has_questionnaire
            };
        } else
        return false;
    }

    private static generateEventReferenceNumber = (length: number) => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXY0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return 'iNEvent-' + result;
      }
}