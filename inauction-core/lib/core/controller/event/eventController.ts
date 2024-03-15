import { EventControllerHandler } from './eventControllerHandler';
import { QuestionnaireControllerHandler } from '../questionnaire/questionnaireControllerHandler';
import { RFQControllerHandler } from '../rfq/rfqControllerHandler';
import { OnlineAuctionHandler } from '../onlineAuction/onlineAuctionControllerHandler';
import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { Event, EventType, EventProgressStatus } from '../../schema/event';
import { Questionnaire } from '../../schema/questionnaire';
import { IQuestionnaireRepository } from '../../repository/questionnaire/IQuestionnaireRepository';
import QuestionnaireRepository from '../../repository/questionnaire/QuestionnaireRepository';
import { Rfq } from '../../schema/rfq';
import { IRFQRepository } from '../../repository/rfq/IRFQRepository';
import RFQRepository from '../../repository/rfq/RFQRepository';
import { IOnlineAuctionRepository } from '../../repository/onlineAuction/IOnlineAuctionRepository';
import OnlineAuctionRepository from '../../repository/onlineAuction/OnlineAuctionRepository';
import { OnlineAuction } from '../../schema/onlineAuction';
import { IPosition } from '../../models/user/IPosition';
import { UserControllerHandler } from '../user/userControllerHandler';
import { EventStatusesEnum } from '../common/enums/EventStatusesEnum';
import { getRepository } from 'typeorm';

export class EventController {

    // todo add a validation here that only experts that have tasks todo or active can create a draft event
    /**
     * Create Draft Event
     * @param req
     * @param res
     */
    public static async create_event_draft(req: Request, res: Response) {

        const handler = await EventControllerHandler.checkEventDraftCreationModel(req, res);
        let eventRepository: IEventRepository = new EventRepository(Event);

        if (handler) {

            let draftEvent = null;

            try {

                let event: Event = new Event();
                event.host = handler.host;
                event.title = handler.title;
                event.referenceNumber = handler.referenceNumber;
                event.description = handler.description;
                event.defineBudget = Boolean(handler.defineBudget);
                event.totalBudget = handler.totalBudget;
                event.expertsNumber = handler.expertsNumber;
                event.currency = handler.currency;
                event.hasQuestionnaire = Boolean(handler.hasQuestionnaire);
                event.eventType = handler.eventType;
                event.progressStatus = handler.progressStatus;
                event.eventCategory = handler.eventCategory;
                event.activity = handler.activity;
                event.createdAt = new Date(Date.now());


                // define initial draftEventResponse
                let draftEventResponse = {
                    event: null,
                    questionnaires: null,
                    rfq: null,
                    onlineAuction: null
                };

                // ---------------------------------------------------------------------------------------------------//

                /**
                 * - If draftEvent has at least one questionnaire:
                 * 1. Check Questionnaire Creation Requirements
                 * 2. Create Questionnaire
                 * 3. Assign Questionnaires array to draftEventResponse Object
                 * - If draftEvent doesn't have any Questionnaire:
                 * 1. Delete `questionnaires` property from draftEventResponse Object
                 */
                if (handler.hasQuestionnaire) {

                    let questionnaireRepository: IQuestionnaireRepository = new QuestionnaireRepository(Questionnaire);

                    // create draft Event
                    draftEvent = await eventRepository.create(event);

                    // after each questionnaire is created push it into this array so we can assign
                    // the array with created questionnaires to draftEventResponse.questionnaires more easily
                    let createdQuestionnaires = [];
                    let newQuestionnairesArray = req.body.questionnaires;
                    let newQuestionnairesArrayNoSplice = req.body.questionnaires;

                    console.log('=======================================================');
                    console.log(req.body.questionnaires);

                    for (let i = newQuestionnairesArrayNoSplice.length - 1; i >= 0; --i) {
                        let currentItem = newQuestionnairesArrayNoSplice[i];
                        newQuestionnairesArray.splice(i, 1);
                        const questionnaireHandler =
                            await QuestionnaireControllerHandler.checkDraftQuestionnaireCreationModel(
                                newQuestionnairesArray,
                                currentItem,
                                res,
                                draftEvent
                            );

                        // check questionnaireHandler
                        if (questionnaireHandler) {
                            let questionnaire: Questionnaire = new Questionnaire();
                            questionnaire.event = draftEvent;
                            questionnaire.title = questionnaireHandler.title;
                            questionnaire.description = questionnaireHandler.description;
                            questionnaire.deadline = questionnaireHandler.deadline;
                            questionnaire.hasScoring = questionnaireHandler.hasScoring;
                            questionnaire.hasWeighting = questionnaireHandler.hasWeighting;
                            questionnaire.isPrequalification = questionnaireHandler.isPrequalification;
                            questionnaire.inEventResultCalculation = questionnaireHandler.inEventResultCalculation;
                            questionnaire.weightingType = questionnaireHandler.weightingType;
                            questionnaire.weighting = questionnaireHandler.weighting;
                            questionnaire.createdAt = new Date(Date.now());
                            createdQuestionnaires.push(await questionnaireRepository.create(questionnaire))
                        } else {
                            failureResponse(ResponseMessages.questionnaireHasInsufficientData, null, res);
                        }
                    }

                    draftEventResponse.event = draftEvent;

                    // assign `createdQuestionnaires` to draftEventResponse.questionnaires
                    draftEventResponse.questionnaires = createdQuestionnaires;
                } else { delete draftEventResponse.questionnaires; }

                // ---------------------------------------------------------------------------------------------------//

                /**
                 * - If eventType is RDQ:
                 * 1. Check RFQ Creation Requirements
                 * 2. Create RFQ
                 * 3. Assign RFQ Response to draftEventResponse Object
                 * - If eventType is Not RFQ:
                 * 1. Delete `rfq` property from draftEventResponse Object
                 */
                if (handler.eventType === EventType.RFQ) {

                    let rfqRepository: IRFQRepository = new RFQRepository(Rfq);
                    const rfqHandler = await RFQControllerHandler.checkDraftRFQCreationModel(req.body.rfq_request, res);
                    if (rfqHandler) {

                        let findQuestionnaireInCalculations = [];
                        if (handler.hasQuestionnaire) {

                            // find questionnaire sent part of RFQ request in questionnaire list
                            findQuestionnaireInCalculations = draftEventResponse.questionnaires;

                            if (findQuestionnaireInCalculations.length === 0) {
                                failureResponse(ResponseMessages.questionnaireMissingFromRFQ, null, res);
                                return false;
                            }

                            // questionnaire should have `has_weighting`, `has_scoring` and
                            // `weighting_type` should be all the types rather than NONE
                            if (
                                !findQuestionnaireInCalculations[0].hasWeighting
                                || findQuestionnaireInCalculations[0].weightingType === 0
                                || !findQuestionnaireInCalculations[0].hasScoring
                            ) {
                                failureResponse(ResponseMessages.incorrectQuestionnaireDataRFQ, null, res);
                                return false;
                            }

                        }
                        else {
                            // create draft Event
                            draftEvent = await eventRepository.create(event);
                        }


                        let rfq: Rfq = new Rfq();
                        rfq.event = draftEvent;
                        rfq.bidDirection = rfqHandler.bidDirection;
                        rfq.bidDeadline = rfqHandler.bidDeadline;
                        rfq.sealResultType = rfqHandler.sealResultType;
                        rfq.weighting = req.body.rfq_request.weighting ? req.body.rfq_request.weighting : null;
                        rfq.questionnaire = handler.hasQuestionnaire && req.body.rfq_request.has_questionnaire_in_score
                            ? findQuestionnaireInCalculations[0]
                            : null;
                        rfq.createdAt = new Date(Date.now());

                        draftEventResponse.event = draftEvent;
                        draftEventResponse.rfq = await rfqRepository.create(rfq);
                    } else {
                        return failureResponse(ResponseMessages.rfqHasInsufficientData, null, res);
                    }
                } else { delete draftEventResponse.rfq; }

                // ---------------------------------------------------------------------------------------------------//

                /**
                 * - If eventType is Online Auction (OA):
                 * 1. Check OA Creation Requirements
                 * 2. Create OA
                 * 3. Assign OA Response to draftEventResponse Object
                 * - If eventType is Not Online Auction (OA):
                 * 1. Delete `onlineAuction` property from draftEventResponse Object
                 */
                if (handler.eventType === EventType.OA) {

                    let onlineAuctionRepository: IOnlineAuctionRepository = new OnlineAuctionRepository(OnlineAuction);
                    const oaHandler =
                        await OnlineAuctionHandler.checkDraftOnlineAuctionCreationModel(req.body.oa_request, res);

                    if (oaHandler) {

                        let findQuestionnaireInCalculations;
                        if (handler.hasQuestionnaire) {

                            // find questionnaire sent part of OA request in questionnaire list
                            findQuestionnaireInCalculations = draftEventResponse.questionnaires.filter(
                                q => q.inEventResultCalculation === true
                            );

                            if (findQuestionnaireInCalculations.length === 0) {
                                failureResponse(ResponseMessages.questionnaireMissingFromOA, null, res);
                                return false;
                            }

                            // questionnaire should have `has_weighting`, `has_scoring` and
                            // `weighting_type` should be all the types rather than NONE
                            if (
                                !findQuestionnaireInCalculations[0].hasWeighting
                                || findQuestionnaireInCalculations[0].weightingType === 0
                                || !findQuestionnaireInCalculations[0].hasScoring
                            ) {
                                failureResponse(ResponseMessages.incorrectQuestionnaireDataOA, null, res);
                                return false;
                            }

                        }
                        else {
                            // create draft Event
                            draftEvent = await eventRepository.create(event);
                        }

                        let onlineAuction: OnlineAuction = new OnlineAuction();
                        onlineAuction.event = draftEvent;
                        onlineAuction.bidDirection = oaHandler.bidDirection;
                        onlineAuction.startTime = oaHandler.startTime;
                        onlineAuction.competitionInfo = oaHandler.competitionInfo;
                        onlineAuction.minimumDuration = oaHandler.minimumDuration;
                        onlineAuction.dynamicClosePeriod = oaHandler.dynamicClosePeriod;
                        onlineAuction.minimumBidChange = oaHandler.minimumBidChange;
                        onlineAuction.maximumBidChange = oaHandler.maximumBidChange;
                        onlineAuction.deadline = oaHandler.deadline;
                        onlineAuction.weighting = req.body.oa_request.weighting ? req.body.oa_request.weighting : null;
                        onlineAuction.questionnaire = handler.hasQuestionnaire && req.body.oa_request.has_questionnaire_in_score
                            ? findQuestionnaireInCalculations[0]
                            : null;
                        onlineAuction.createdAt = new Date(Date.now());

                        draftEventResponse.event = draftEvent;
                        draftEventResponse.onlineAuction = await onlineAuctionRepository.create(onlineAuction);
                    } else {
                        return failureResponse(ResponseMessages.oaHasInsufficientData, null, res);
                    }
                } else { delete draftEventResponse.onlineAuction; }

                // response
                return res.send(draftEventResponse);

            } catch (err) { errorResponse(err, res); }
        } else { insufficientParameters(res); }
    }

    //  Retrieve Event Statuses - needed for Event Creation
    public static async getEventStatuses(req: Request, res: Response) {
        try {
            const eventStatuses: Array<IPosition> = [];

            for (const [propertyKey, propertyValue] of Object.entries(EventStatusesEnum)) {
                if (!Number.isNaN(Number(propertyKey))) {
                    continue;
                }
                eventStatuses.push({ id: Number(propertyValue), name: UserControllerHandler.replaceUndescoreWithSpace(propertyKey) });
            }

            res.send(eventStatuses)
        }
        catch (err) {
            errorResponse(err, res);
        }

    }

    //  Retrieve draft events
    public static async get_events(req: Request, res: Response) {
        let eventRepository: IEventRepository = new EventRepository(Event);
        try {
            let events = [];

            if (req.params.status == 'draft') {
                events = await eventRepository.getEventsByStatus(EventProgressStatus.DRAFT);
            }
            else {
                events = await eventRepository.getAll();
            }

            res.send(events);
        }
        catch (err) {
            errorResponse(err, res);
        }
    }


    /**
     * Update Address
     */
    public static async publishEvent(req: Request, res: Response) {

        let eventRepository: IEventRepository = new EventRepository(Event);

        if (
            req.body.eventid
        ) {
            let event = await eventRepository.findById(req.body.eventid);

            // check if company is of the requestUser
            if (event) {
                event.progressStatus = EventProgressStatus.PUBLISHED;

                event = await eventRepository.updateEvent(event.id, event);
                res.send({
                    message: "Event has been published successfully!",
                    data: event
                });
            } else {
                failureResponse(ResponseMessages.eventDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    //  Retrieve draft events
    public static async getEventDetails(req: Request, res: Response) {
        let eventRepository = getRepository(Event);
        if (req.params.event_id) {

            let events = await eventRepository.find({
                where: { id: req.params.event_id },
                relations: ['currency', 'host', 'eventCategory', 'activity', 'onlineAuctions', 'rfqs', 'questionNaires', 'files']
            });

            if (events && events.length > 0) {
                res.send({
                    message: "Event has been published successfully!",
                    data: events[0]
                });
            } else {
                failureResponse(ResponseMessages.eventDoesNotExist, null, res);
            }
        }
        else {
            insufficientParameters(res);
        }
    }


}
