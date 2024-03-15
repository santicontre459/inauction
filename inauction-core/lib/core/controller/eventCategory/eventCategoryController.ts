import { EventCategoryControllerHandler } from './eventCategoryControllerHandler';
import { IEventCategoryRepository } from '../../repository/eventCategory/IEventCategoryRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import EventCategoryRepository from '../../repository/eventCategory/eventCategoryRepository';
import { EventCategory, EventCategoryStatus } from '../../schema/eventCategory';
import { Request, Response } from 'express';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

export class EventCategoryController {

    // Create Event Category
    public static async create_eventCategory(req: Request, res: Response) {

        let  eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        
        const handler = EventCategoryControllerHandler.checkEventCategoryCreationModel(req);
        
        if (handler) {

            let eventCategory: EventCategory = new EventCategory();
            eventCategory.name = handler.name;
            eventCategory.description = handler.description;
            eventCategory.status = EventCategoryStatus.ACTIVE;

            let timestamp: Date = new Date(Date.now());
            eventCategory.createdAt = timestamp;
            eventCategory.modifiedAt = timestamp;
            eventCategory.isDeleted = false;
            eventCategory.modifiedBy = AuthorizationCheck.getCurrentUser(req);

            const response = await  eventCategoryRepository.create(eventCategory);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    // Get One Event Category
    public static async get_eventCategory(req: Request, res: Response) {
        let  eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        if (req.params.id) {
            const eventCategory_filter = { id: req.params.id };
            await eventCategoryRepository.filterEventCategory(eventCategory_filter).then(data => {
                if (data){
                    res.send(data);
                } else {
                    failureResponse(ResponseMessages.eventCategoryDoesNotExist, null, res);
                }
           }).catch(err => {
                errorResponse(err, res);
           });
        } else {
            insufficientParameters(res);
        }
    }

    // Get All Event Categories
    public static async get_eventCategories(req: Request, res: Response) {
        let eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        const eventCategory = await eventCategoryRepository.getAll();

        if (eventCategory.length > 0)
            res.send(eventCategory);
        else
            res.send([]);

    }

    // Get All Active Event Categories
    public static async get_eventCategoriesHost(req: Request, res: Response) {
        let eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        const eventCategory = await eventCategoryRepository.getActive();

        if (eventCategory.length > 0)
            res.send(eventCategory);
        else
            res.send([]);

    }

    // Update Event Category
    public static async update_eventCategory(req: Request, res: Response) {
        let eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        const handler = EventCategoryControllerHandler.checkEventCategoryCreationModel(req);
        if (handler && req.params.id) {
            const eventCategory_filter = { id: req.params.id };
            let eventCategory = await  eventCategoryRepository.filterEventCategory(eventCategory_filter);
            if (eventCategory) {
                eventCategory.name = handler.name;
                eventCategory.description = handler.description;
                eventCategory.modifiedAt = new Date(Date.now());
                eventCategory.modifiedBy =  AuthorizationCheck.getCurrentUser(req);

                const response = await eventCategoryRepository.updateEventCategory(req.params.id, eventCategory);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.eventCategoryDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Event Category Status
    public static async changeStatus_eventCategory(req: Request, res: Response) {
        let eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        if (req.params.id) {
            const eventCategory_filter = { id: req.params.id };
            let eventCategory = await  eventCategoryRepository.filterEventCategory(eventCategory_filter);

            if (eventCategory) {

                // validate if status is sent in the request and it is different from that resource current status
                if (req.body.status && req.body.status !== eventCategory.status) {
                    eventCategory.status = req.body.status;
                    eventCategory.modifiedAt = new Date(Date.now());
                    eventCategory.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const response = await eventCategoryRepository.updateEventCategory(req.params.id, eventCategory);
                    res.send(response);
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.eventCategoryDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Event Category
    public static async delete_eventCategory(req: Request, res: Response) {
        let eventCategoryRepository: IEventCategoryRepository = new EventCategoryRepository(EventCategory);
        if (req.params.id) {
            const eventCategory_filter = { id: req.params.id };
            let eventCategory = await  eventCategoryRepository.filterEventCategory(eventCategory_filter);
            if (eventCategory) {
                eventCategory.isDeleted = true;
                eventCategory.modifiedAt = new Date(Date.now());
                eventCategory.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await eventCategoryRepository.updateEventCategory(req.params.id, eventCategory);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.eventCategoryDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}