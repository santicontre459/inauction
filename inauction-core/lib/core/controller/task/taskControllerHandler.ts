import { ITaskModel } from '../../models/task/ITask';
import {Request, Response} from 'express';
import { getRepository } from "typeorm";
import { TaskNames } from "../../schema/taskNames";
import { TaskTypes } from "../../schema/taskTypes";
import { Expert } from "../../schema/expert";
import { CompilationStatus } from "../../schema/task";
import { Event } from '../../schema/event';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import {failureResponse} from "../common/handler/responseHandler";
import {ResponseMessages} from "../common/resource/Resource";
import {isEmpty} from "class-validator";

export class TaskControllerHandler {

    public static async checkTaskCreationModel(req:Request, res: Response) : Promise<ITaskModel | false> {

        const taskNameRepository = getRepository(TaskNames);
        const taskTypeRepository = getRepository(TaskTypes);
        const expertRepository = getRepository(Expert);
        const eventRepository = getRepository(Event);
        // todo add event required when event is competed

        // get request user id in order to determine task creator
        const requestUser = AuthorizationCheck.getCurrentUser(req);

        if(req.body.name &&
            req.body.type &&
            req.body.expert &&
            req.body.start_date &&
            req.body.end_date
            ) {

                // taskName, taskType, expert
                let taskName = await taskNameRepository.findOne(req.body.name);
                let taskType = await taskTypeRepository.findOne(req.body.type);
                let expert = await expertRepository.findOne(req.body.expert);

                let event = null;
                if (req.body.event) {
                    event = await eventRepository.findOne(req.body.event);
                    if (isEmpty(event)) {
                        failureResponse(ResponseMessages.eventDoesNotExist, null, res);
                        return false;
                    }
                }

                if (isEmpty(expert)) {
                    failureResponse(ResponseMessages.expertDoesNotExist, null, res);
                    return false;
                }

                if (isEmpty(taskName)) {
                    failureResponse(ResponseMessages.taskNameDoesNotExist, null, res);
                    return false;
                }

                if (isEmpty(taskType)) {
                    failureResponse(ResponseMessages.taskNameDoesNotExist, null, res);
                    return false;
                }

                return {
                    name: await taskName,
                    type: await taskType,
                    expert: await expert,
                    event: await event,
                    startDate: req.body.start_date,
                    endDate: req.body.end_date,
                    compilationStatus: CompilationStatus.TODO,
                    reporter: requestUser,
                    description: req.body.description ? req.body.description : null,

                };
            }
    }
}