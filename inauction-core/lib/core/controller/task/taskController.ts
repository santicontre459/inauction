import { ITaskName, ITaskType } from '../../models/task/ITask';
import { ITaskRepository } from '../../repository/task/ITaskRepository';
import { TaskControllerHandler } from './taskControllerHandler';
import { Request, Response } from 'express';
import TaskRepository from '../../repository/task/taskRepository';
import { Task } from '../../schema/task';
import { failureResponse, insufficientParameters } from '../common/handler/responseHandler';
import ExpertRepository from '../../repository/experts/ExpertRepository';
import { Expert } from '../../schema/expert';
import { TaskNames } from '../../schema/taskNames';
import { TaskTypes } from '../../schema/taskTypes';
import { IExpertRepository } from "../../repository/experts/IExpertRepository";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { ResponseMessages } from "../common/resource/Resource";
import { isEmpty } from "class-validator";
import { getRepository } from "typeorm";
import UserRepository from "../../repository/user/userRepository";
import { User } from "../../schema/user";
import {TaskNote} from "../../schema/taskNote";
import TaskNoteRepository from "../../repository/taskNote/taskNoteRepository";
import { ITaskNoteRepository } from "../../repository/taskNote/ITaskNoteRepository";

export class TaskController {

    /** Add Task **/
    public static async create(req: Request, res: Response) {
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);
        let taskRepository: ITaskRepository = new TaskRepository(Task);
        const taskHandler = await TaskControllerHandler.checkTaskCreationModel(req, res);

        // get request user id in order to determine if expert is part of the request user
        const requestUser = AuthorizationCheck.getCurrentUser(req);

        if (taskHandler) {

            let expert = await expertRepository.findById(taskHandler.expert.id);

            // check if expert which we want to assign the task exists
            if (isEmpty(await expertRepository.checkIfExpertExists(taskHandler.expert.id))) {
                failureResponse(ResponseMessages.expertDoesNotExist, null, res);
                return false;
            }

            if (expert && expert.customer.id !== requestUser ) {
                failureResponse(ResponseMessages.expertDoesNotExist, null, res);
                return false;
            }

            // task create
            let taskEntity: Task = new Task();
            taskEntity.name = taskHandler.name;
            taskEntity.type = taskHandler.type;
            taskEntity.expert = taskHandler.expert;
            taskEntity.event = taskHandler.event;
            taskEntity.reporter = taskHandler.reporter;
            taskEntity.createdAt = new Date();
            taskEntity.startDate = taskHandler.startDate;
            taskEntity.endDate = taskHandler.endDate;
            taskEntity.description = taskHandler.description;
            taskEntity.compilationStatus = taskHandler.compilationStatus;

            const taskResponse = await taskRepository.create(taskEntity);

            res.send({
                message: "Task has been created successfully!",
                data: taskResponse
            });

        } else {
            insufficientParameters(res);
        }
    }

    /** Retrieve tasks by customer (Host || Bidder) */
    public static async getTasksByCustomer(req: Request, res: Response) {

        const expertRepository = getRepository(Expert);
        if (req.params.customer_id) {
            let query = {
                reporter: req.params.customer_id,
                isDeleted: false,
                compilationStatus: undefined,
                expert: undefined
            };

            // check if has filters
            // 1. `compilation_status` filter
            if(req.query.compilation_status){
                query.compilationStatus = req.query.compilation_status;
            } else { delete query.compilationStatus; }

            // 2. `expert` filter
            if(req.query.expert){
                query.expert = req.query.expert;
            } else { delete query.expert; }

            let taskRepository: ITaskRepository = new TaskRepository(Task);

            const tasks = await taskRepository.getAll(query);

            if (tasks.length > 0) {
                let tasksResponse = [];
                for (const task of tasks) {
                    let expert = await expertRepository.findOne(task.expert.id, {relations: ['user']});
                    task.expert.user = expert.user;
                    tasksResponse.push(task);
                }
                res.send(tasksResponse);
            }
            else {
                res.send([]);
            }
        } else {
            insufficientParameters(res);
        }
    }

    /** Retrieve deleted tasks by customer (Host || Bidder) */
    public static async getDeletedTasksByCustomer(req: Request, res: Response) {

        const expertRepository = getRepository(Expert);
        if (req.params.customer_id) {
            let query = {
                reporter: req.params.customer_id,
                isDeleted: true,
                compilationStatus: undefined,
                expert: undefined

            };

            // check if has filters
            // 1. `compilation_status` filter
            if(req.query.compilation_status){
                query.compilationStatus = req.query.compilation_status;
            } else { delete query.compilationStatus; }

            // 2. `expert` filter
            if(req.query.expert){
                query.expert = req.query.expert;
            } else { delete query.expert; }


            let taskRepository: ITaskRepository = new TaskRepository(Task);

            const tasks = await taskRepository.getAll(query);

            if (tasks.length > 0) {
                let tasksResponse = [];
                for (const task of tasks) {
                    let expert = await expertRepository.findOne(task.expert.id, {relations: ['user']});
                    task.expert.user = expert.user;
                    tasksResponse.push(task);
                }
                res.send(tasksResponse);
            }
            else {
                res.send([]);
            }
        } else {
            insufficientParameters(res);
        }
    }

    /** Retrieve tasks for customer (Host || Bidder) */
    public static async getTasks(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);

        // get request user id in order to determine if expert is part of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        const user = await userRepository.findById(requestUser);

        // define filtering query
        let query = {
            reporter: undefined,
            expert: undefined,
            isDeleted: false,
            compilationStatus: undefined,
        };

        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({user: requestUser});
            query.expert = expert.id;
            delete query.reporter;
        } else {
            query.reporter = requestUser;
            // `expert` filter
            if(req.query.expert){
                query.expert = req.query.expert;
            } else { delete query.expert; }

        }

        // check if has filters
        // 1. `compilation_status` filter
        if(req.query.compilation_status){
            query.compilationStatus = req.query.compilation_status;
        } else { delete query.compilationStatus; }


        const tasks = await taskRepository.getAll(query);

        if (tasks.length > 0) {
            let tasksResponse = [];
            for (const task of tasks) {
                let expert = await expertRepository.findOne(task.expert.id, {relations: ['user']});
                task.expert.user = expert.user;
                tasksResponse.push(task);
            }
            res.send(tasksResponse);
        }
        else {
            res.send([]);
        }

    }

    /** Retrieve a task details */
    public static async getTask(req: Request, res: Response) {

        let taskRepository: ITaskRepository = new TaskRepository(Task);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);

        // get request user id in order to determine if expert is part of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        const user = await userRepository.findById(requestUser);

        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({user: requestUser});
            requestUser = expert.id;
        }

        if (req.params.id) {

            let task = await taskRepository.findById(req.params.id);
            // check if task belongs to the expert or admin
            if (task) {
                if (
                    task && task.reporter.id === requestUser ||
                    task && task.expert.id === requestUser
                ) {
                    let expert = await expertRepository.findOne(task.expert.id, {relations: ['user']});
                    task.expert.user = expert.user;
                    res.send(task)
                } else {
                    failureResponse(ResponseMessages.taskDoesNotExist, null, res);
                }

            } else {
                failureResponse(ResponseMessages.taskDoesNotExist, null, res);
            }

        } else {
            insufficientParameters(res);
        }

    }


    /** Update Task */
    public static async update(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);

        const taskNameRepository = getRepository(TaskNames);
        const taskTypeRepository = getRepository(TaskTypes);
        const expertRepository = getRepository(Expert);

        // get request user id in order to determine if expert is part of the request user
        const requestUser = AuthorizationCheck.getCurrentUser(req);

        if (req.params.id) {

            if (req.body.name
                && req.body.type
                && req.body.expert
                && req.body.start_date
                && req.body.end_date
            ) {

                // taskName, taskType, expert
                let taskName = await taskNameRepository.findOne(req.body.name);
                let taskType = await taskTypeRepository.findOne(req.body.type);
                let expert = await expertRepository.findOne(req.body.expert, { relations: ['customer'] });

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

                if (expert && expert.customer.id !== requestUser ) {
                    failureResponse(ResponseMessages.expertDoesNotExist, null, res);
                    return false;
                }

                let task = await taskRepository.findById(req.params.id);
                if (task && task.reporter.id === AuthorizationCheck.getCurrentUser(req) ) {

                    task.name = req.body.name;
                    task.type = req.body.type;
                    task.expert = req.body.expert;
                    task.event = req.body.event ? req.body.event : null;
                    task.startDate = req.body.start_date;
                    task.endDate = req.body.end_date;
                    task.description = req.body.description ? req.body.description : null;
                    task.modifiedAt = new Date(Date.now());
                    task.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const taskResponse = await taskRepository.updateTask(req.params.id, task);
                    res.send({
                        message: "Task has been updated successfully!",
                        data: taskResponse,
                    });
                } else { failureResponse(ResponseMessages.taskDoesNotExist, null, res); }

            } else { insufficientParameters(res); }
        } else { insufficientParameters(res); }

    }

    /**
     * Change compilation status for a Task
     * When changing compilation status for task we need to change only allowed statuses
     */
    public static async changeCompilationStatus(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);

        // get request user id in order to determine if expert is part of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        const user = await userRepository.findById(requestUser);

        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({user: requestUser});
            requestUser = expert.id;
        }

        if (req.params.id) {
            let task = await taskRepository.findById(req.params.id);
            if (
                task && task.reporter.id === requestUser ||
                task && task.expert.id === requestUser
            ) {

                // combinations allowed
                // [currentCompilationStatus, newCompilationStatus]

                let compilationStatusCombinationsAllowed =
                    [
                        { current : 1, new: 0 },
                        { current : 1, new: 2 },
                        { current : 1, new: 3 },
                        { current : 1, new: 4 },
                        { current : 0, new: 1 },
                        { current : 2, new: 1 },
                        { current : 3, new: 1 },
                        { current : 3, new: 2 },
                        { current : 3, new: 4 },
                        { current : 4, new: 3 },
                        { current : 4, new: 1 },
                    ];

                if (!isEmpty(req.body.current_compilation_status) && !isEmpty(req.body.new_compilation_status)) {

                    // check if requested body statuses are allow
                    let checkStatusAllowed = compilationStatusCombinationsAllowed.filter(function (statusAllowed) {
                        return statusAllowed.current === req.body.current_compilation_status
                            && statusAllowed.new === req.body.new_compilation_status;
                    });

                    if (checkStatusAllowed.length === 0 ) {
                        failureResponse(ResponseMessages.taskCompilationStatusesChangesNotAllow, null, res);
                        return false;
                    }
                    else {
                        // Update Task schema
                        task.compilationStatus = req.body.new_compilation_status;
                        task.modifiedAt = new Date(Date.now());
                        task.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        await taskRepository.update(req.params.id, task);
                        res.send({
                            message: "Task compilation status has been changed successfully!",
                        });
                    }
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.taskDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }

    }

    /**
     * Delete a task
     * When deleting a task we need to make sure task is not in status completed or in progress
     */
    public static async delete(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);

        if (req.params.id) {
            let task = await taskRepository.findById(req.params.id);
            if (task && task.reporter.id === AuthorizationCheck.getCurrentUser(req) ) {

                // check if the task is already completed or in progress
                if (task && task.compilationStatus === 0 || task && task.compilationStatus === 1) {
                    failureResponse(ResponseMessages.taskNotDeletableDueToStatus, null, res);
                }
                else {

                    // Update Task schema
                    task.isDeleted = true;
                    task.modifiedAt = new Date(Date.now());
                    task.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    await taskRepository.update(req.params.id, task);
                    res.send({
                        message: "Task has been deleted successfully!",
                    });
                }

            } else {
                failureResponse(ResponseMessages.taskDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    /** Get Tasks Names needed for task creation**/
    public static async get_task_name(req: Request, res: Response) {

        let taskRepository: TaskRepository = new TaskRepository(Task);

        let taskNames = await taskRepository.getAllTaskNames();
        let taskTypes = await taskRepository.getAllTaskTypes();

        if (!taskNames) {
            failureResponse("No tasks names are added", null, res);
        }

        let taskNamesResponse: Array<ITaskName> = [];

        taskNames.forEach(taskNameItem => {

            let taskTypesResponse = taskTypes.filter(f => f.taskName.id == taskNameItem.id);
            let taskTypeMatch: Array<ITaskType> = [];

            taskTypesResponse.forEach(item => {
                let taskTypeItem: ITaskType = {
                    id: item.id,
                    name: item.name
                };
                taskTypeMatch.push(taskTypeItem);
            });

            let taskName: ITaskName = {
                id: taskNameItem.id,
                name: taskNameItem.name,
                types: taskTypeMatch
            };
            taskNamesResponse.push(taskName);
        });

        res.send(taskNamesResponse);
    }

    /** Add Task Note **/
    public static async addNote(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);
        let taskNoteRepository: ITaskNoteRepository = new TaskNoteRepository(TaskNote);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);

        // get request user id in order to determine if expert is part of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);

        const user = await userRepository.findById(requestUser);

        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({user: requestUser});
            requestUser = expert.id;
        }

        if (req.body.note &&
            req.body.task
        ) {

            let task = await taskRepository.findById(req.body.task);
            // check if task belongs either to the rep or owner
            if (task) {
                if (
                    task && task.reporter.id === requestUser ||
                    task && task.expert.id === requestUser
                ) {
                    // task note create
                    let taskNoteEntity: TaskNote = new TaskNote();
                    taskNoteEntity.note = req.body.note;
                    taskNoteEntity.task = task;
                    taskNoteEntity.commenter = AuthorizationCheck.getCurrentUser(req);
                    taskNoteEntity.createdAt = new Date();

                    const taskNoteResponse = await taskNoteRepository.create(taskNoteEntity);

                    res.send({
                        message: "Note has been added successfully!",
                        data: taskNoteResponse
                    });
                } else {
                    failureResponse(ResponseMessages.taskDoesNotExist, null, res);
                }

            } else {
                failureResponse(ResponseMessages.taskDoesNotExist, null, res);
            }

        } else {
            insufficientParameters(res);
        }
    }

    /** Get Task Notes **/
    public static async getNotes(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);
        let taskNoteRepository: ITaskNoteRepository = new TaskNoteRepository(TaskNote);
        const expertRepository = getRepository(Expert);
        let userRepository  = new UserRepository(User);

        // get request user id in order to determine if expert is part of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);

        const user = await userRepository.findById(requestUser);

        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({user: requestUser});
            requestUser = expert.id;
        }

        if (req.params.task_id) {

            let task = await taskRepository.findById(req.params.task_id);
            // check if task belongs either to the rep or owner
            if (task) {
                if (
                    task && task.reporter.id === requestUser ||
                    task && task.expert.id === requestUser
                ) {
                    let query = {
                        task: req.params.task_id,
                        isDeleted: false
                    };

                    const tasksNotes = await taskNoteRepository.getAll(query);
                    res.send(tasksNotes);
                } else {
                    failureResponse(ResponseMessages.taskDoesNotExist, null, res);
                }

            } else {
                failureResponse(ResponseMessages.taskDoesNotExist, null, res);
            }

        } else {
            insufficientParameters(res);
        }
    }

    /** Update Task Note **/
    public static async updateNote(req: Request, res: Response) {
        let taskRepository: ITaskRepository = new TaskRepository(Task);
        let taskNoteRepository: ITaskNoteRepository = new TaskNoteRepository(TaskNote);

        if (req.body.note &&
            req.body.task &&
            req.params.id
        ) {

            let task = await taskRepository.findById(req.body.task);
            let taskNote = await taskNoteRepository.findById(req.params.id);
            // check if task belongs either to the rep or owner and to the note
            if (task && task.id === req.body.task) {
                if (
                    taskNote && taskNote.commenter.id === AuthorizationCheck.getCurrentUser(req)
                ) {
                    // task note update
                    let taskNoteEntity: TaskNote = new TaskNote();
                    taskNoteEntity.note = req.body.note;
                    taskNoteEntity.modifiedAt = new Date(Date.now());
                    taskNoteEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const taskNoteResponse = await taskNoteRepository.updateTaskNote(req.params.id, taskNoteEntity);
                    res.send({
                        message: "Note has been changed successfully!",
                        data: taskNoteResponse,
                    });
                } else {
                    failureResponse(ResponseMessages.taskNoteDoesNotExist, null, res);
                }

            } else {
                failureResponse(ResponseMessages.taskDoesNotExist, null, res);
            }

        } else {
            insufficientParameters(res);
        }
    }

}
