import { RFQControllerHandler } from './rfqControllerHandler';

import { IRFQRepository } from '../../repository/rfq/IRFQRepository';
import RFQRepository from '../../repository/rfq/RFQRepository';

import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { Event } from '../../schema/event';
import { Rfq } from '../../schema/rfq';

export class RFQController {
    // todo check if this in needed in later phases
}