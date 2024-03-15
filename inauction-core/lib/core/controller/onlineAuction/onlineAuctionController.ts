import { OnlineAuctionHandler } from './onlineAuctionControllerHandler';
import { IOnlineAuctionRepository } from '../../repository/onlineAuction/IOnlineAuctionRepository';
import { IQuestionnaireRepository } from '../../repository/questionnaire/IQuestionnaireRepository';
import QuestionnaireRepository from '../../repository/questionnaire/QuestionnaireRepository';
import OnlineAuctionRepository from '../../repository/onlineAuction/OnlineAuctionRepository';
import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { OnlineAuction } from '../../schema/onlineAuction';
import { Event } from '../../schema/event';
import { Questionnaire } from '../../schema/questionnaire';

export class OnlineAuctionController {
    // todo check if this in needed in later phases
}