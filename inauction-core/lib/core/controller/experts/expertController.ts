import { IUserRepository } from '../../repository/user/IUserRepository';
import { IExpertRepository } from '../../repository/experts/IExpertRepository';
import { Request, Response } from 'express';
import { ResponseMessages } from '../common/resource/Resource';
import ExpertRepository from '../../../core/repository/experts/ExpertRepository';
import { Expert } from '../../schema/expert';
import UserRepository from '../../../core/repository/user/userRepository';
import { User, UserStatus } from '../../schema/user';
import {
    failureResponse,
    insufficientParameters
} from '../common/handler/responseHandler';

import { UserControllerHandler } from "../user/userControllerHandler";
import { Role } from "../../schema/role";
import { PasswordEncryption } from "../common/passwordEncryption/encryption";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { getRepository } from "typeorm";
import TaskRepository from "../../repository/task/taskRepository";
import {
    Task,
    CompilationStatus
} from "../../schema/task";
import { isEmpty } from "class-validator";

export class ExpertController {

    /** Retrieve experts by customer (Host || Bidder) */
    public static async getExpertsByCustomer(req: Request, res: Response) {

        if (req.params.customer_id) {
            let expertRepository: IExpertRepository = new ExpertRepository(Expert);
            let query = {
                customer: req.params.customer_id,
                isDeleted: false,
                deletedByAdmin: false
            };
            const experts = await expertRepository.getAll(query);

            if (experts.length > 0)
                res.send(experts);
            else
                res.send([]);
        } else {
            insufficientParameters(res);
        }
    }

    /** Retrieve deleted experts by customer (Host || Bidder) */
    public static async getDeletedExpertsByCustomer(req: Request, res: Response) {

        if (req.params.customer_id) {
            let expertRepository: IExpertRepository = new ExpertRepository(Expert);
            let query = {
                customer: req.params.customer_id,
                isDeleted: true,
                deletedByAdmin: true
            };
            const experts = await expertRepository.getAll(query);

            if (experts.length > 0)
                res.send(experts);
            else
                res.send([]);
        } else {
            insufficientParameters(res);
        }
    }

    /** Retrieve experts for customer (Host || Bidder) */
    public static async getExperts(req: Request, res: Response) {
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);
        let query = {
            customer: AuthorizationCheck.getCurrentUser(req),
            isDeleted: false,
            deletedByAdmin: false
        };
        const experts = await expertRepository.getAll(query);

        if (experts.length > 0)
            res.send(experts);
        else
            res.send([]);
    }

    /** Create Expert **/
    public static async create(req: Request, res: Response) {
        let userRepository: IUserRepository = new UserRepository(User);
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);
        const baseUserRepository = getRepository(User);

        const expertHandler = await UserControllerHandler.checkExpertCreationModel(req);

        // get request user id in order to determine company of parent user
        const requestUser = AuthorizationCheck.getCurrentUser(req);
        let userCompany = (
            await baseUserRepository.findOne(
                requestUser, { relations: ['role', 'subrole', 'company'] }
            )
        ).company;

        // get expert parent user
        let customer = await baseUserRepository.findOne(requestUser);


        if (expertHandler) {
            // experts can have only Internal Expert (7) or External Expert (8) Position on User Schema
            // [ 7,8 ]
            let positionsAllowed = [7, 8];
            if (positionsAllowed.includes(req.body.position)) {

                let role = new Role();
                let subRole = new Role();

                // check if role exists
                if (expertHandler.roleId) {
                    role = expertHandler.roleId;
                } else {
                    failureResponse(ResponseMessages.roleDoesNotExist, null, res);
                }

                // check if sub role exists
                if (expertHandler.subroleId) {
                    subRole = expertHandler.subroleId;
                } else {
                    failureResponse(ResponseMessages.subRoleDoesNotExist, null, res);
                }

                // check if an user is already registered with given email
                if (await userRepository.checkIfUserExist(expertHandler.email)) {
                    failureResponse(ResponseMessages.expertAlreadyExist, null, res);
                    return false;
                }

                // user create
                let userEntity: User = new User();
                userEntity.firstName = expertHandler.firstName;
                userEntity.lastName = expertHandler.lastName;
                userEntity.password = PasswordEncryption.hashPassword(req.body.password);
                userEntity.role = role;
                userEntity.subrole = subRole;
                userEntity.email = expertHandler.email;
                userEntity.status = expertHandler.status;
                userEntity.email_verified = expertHandler.email_verified;
                userEntity.verification_status = expertHandler.verification_status;
                userEntity.phoneNumber = expertHandler.phoneNumber;
                userEntity.registrationMethod = expertHandler.registrationMethod;
                userEntity.registrationType = expertHandler.registrationType;
                userEntity.firstLogin = null;
                userEntity.lastLogin = null;
                userEntity.company = userCompany;
                userEntity.position = expertHandler.position;
                userEntity.createdAt = new Date(Date.now());
                userEntity.modifiedAt = new Date(Date.now());



                try {
                    const userResponse = await userRepository.create(userEntity);

                    // expert create
                    let expertEntity: Expert = new Expert();
                    expertEntity.position = req.body.expert_position;
                    expertEntity.user = userResponse;
                    expertEntity.customer = customer;
                    expertEntity.createdAt = new Date(Date.now());

                    const expertResponse = await expertRepository.create(expertEntity);
                    res.send({
                        message: "Expert has been created successfully!",
                        data: expertResponse
                    });
                } catch (error) {
                    failureResponse(ResponseMessages.expertAlreadyExist, null, res);
                }
            }
            else {
                failureResponse(ResponseMessages.expertPositionNotAllowed, null, res);
            }

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Get Experts Needed for tasks Creation
     * Experts should be with active status
     */
    public static async getExpertsForTasks(req: Request, res: Response) {
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);
        let query = {
            customer: AuthorizationCheck.getCurrentUser(req),
            isDeleted: false,
            deletedByAdmin: false
        };
        const experts = await expertRepository.getAll(query);

        if (experts.length > 0) {
            let filteredExperts = experts.filter(e => e.user.status === 1);
            res.send(filteredExperts);
        }
        else { res.send([]); }
    }

    /** Retrieve an expert details */
    public static async getExpert(req: Request, res: Response) {

        let expertRepository: IExpertRepository = new ExpertRepository(Expert);
        if (req.params.id) {

            let expert = await expertRepository.findById(req.params.id);
            if (expert) {
                delete expert.customer;
                res.send(expert)
            } else {
                failureResponse(ResponseMessages.expertDoesNotExist, null, res);
            }

        } else {
            insufficientParameters(res);
        }

    }


    /**
     * Update Expert
     * When updating an expert expert we are setting these properties:
     * 1. `firstName` for user schema
     * 2. `lastName` for user schema
     * 3. `phoneNumber` for user schema
     * 4. `position` for user schema
     * 5. `position` for expert schema
     */
    public static async update(req: Request, res: Response) {
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);

        if (req.params.id) {

            if (req.body.first_name
                && req.body.last_name
                && req.body.phone
                && req.body.position
                && req.body.expert_position
            ) {

                // experts can have only Internal Expert (7) or External Expert (8) Position on User Schema
                // [ 7,8 ]
                let positionsAllowed = [7, 8];
                if (positionsAllowed.includes(req.body.position)) {

                    let expert = await expertRepository.findById(req.params.id);
                    if (expert && expert.customer.id === AuthorizationCheck.getCurrentUser(req)) {

                        let userRepository = new UserRepository(User);
                        let parentUser = await userRepository.findByIdWithoutStatusCheck(expert.user.id);

                        // Update User schema
                        parentUser.firstName = req.body.first_name;
                        parentUser.lastName = req.body.last_name;
                        parentUser.phoneNumber = req.body.phone;
                        parentUser.position = req.body.position;
                        parentUser.modifiedAt = new Date(Date.now());
                        parentUser.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        // Update Expert schema
                        expert.position = req.body.expert_position;
                        expert.modifiedAt = new Date(Date.now());
                        expert.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        await userRepository.updateUser(expert.user.id, parentUser);
                        const expertResponse = await expertRepository.updateExpert(req.params.id, expert);
                        res.send({
                            message: "Expert has been updated successfully!",
                            data: expertResponse,
                        });
                    } else { failureResponse(ResponseMessages.expertDoesNotExist, null, res); }
                } else { failureResponse(ResponseMessages.expertPositionNotAllowed, null, res); }
            } else { insufficientParameters(res); }
        } else { insufficientParameters(res); }

    }

    /**
     * changeStatus for Expert
     * When changing status for expert we are setting properties:
     * 1. `status` for user schema to inactive
     */
    public static async changeStatus_expert(req: Request, res: Response) {
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);

        if (req.params.id) {
            let expert = await expertRepository.findById(req.params.id);
            if (expert && expert.customer.id === AuthorizationCheck.getCurrentUser(req)) {

                let taskRepository: TaskRepository = new TaskRepository(Task);
                const task_filter = {
                    expert: req.params.id,
                    compilationStatus: CompilationStatus.IN_PROGRESS
                };

                // check if this expert has already active and in progress tasks assigned to
                let taskAssigned = await taskRepository.getAll(task_filter);
                if (taskAssigned.length > 0 && req.body.status === 0) {
                    failureResponse(ResponseMessages.expertNotDeactivatedDueToTasks, null, res);
                }
                else {
                    // validate if status is sent in the request and it is different from that resource current status
                    let userRepository = new UserRepository(User);
                    let parentUser = await userRepository.findByIdWithoutStatusCheck(expert.user.id);
                    if (!isEmpty(req.body.status) && req.body.status !== parentUser.status) {

                        // Update User schema
                        parentUser.status = req.body.status;
                        parentUser.modifiedAt = new Date(Date.now());
                        parentUser.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        // Update Expert schema
                        expert.modifiedAt = new Date(Date.now());
                        expert.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        await userRepository.updateUser(expert.user.id, parentUser);
                        await expertRepository.update(req.params.id, expert);
                        res.send({ message: "Expert status has been changed successfully!", });
                    }
                    else {
                        failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                    }
                }

            } else {
                failureResponse(ResponseMessages.expertDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }

    }

    /**
     * DeleteAdmin An Expert
     * When deleting admin expert we are setting properties:
     * 1. `isDeleted` for both user and expert schema to true
     * 2. `status` for user schema to inactive
     * 3. `deletedByAdmin` for expert schema to true
     */
    public static async deleteAdmin(req: Request, res: Response) {
        let expertRepository: IExpertRepository = new ExpertRepository(Expert);

        if (req.params.id) {
            let expert = await expertRepository.findById(req.params.id);
            if (expert && expert.customer.id === AuthorizationCheck.getCurrentUser(req)) {

                let taskRepository: TaskRepository = new TaskRepository(Task);
                const task_filter = {
                    expert: req.params.id,
                    compilationStatus: CompilationStatus.IN_PROGRESS
                };

                // check if this expert has already active and in progress tasks assigned to
                let taskAssigned = await taskRepository.getAll(task_filter);
                if (taskAssigned.length > 0) {
                    failureResponse(ResponseMessages.expertNotDeletableDueToTasks, null, res);
                }
                else {
                    let userRepository = new UserRepository(User);
                    let parentUser = await userRepository.findByIdWithoutStatusCheck(expert.user.id);

                    // Update User schema
                    parentUser.isDeleted = true;
                    parentUser.status = UserStatus.INACTIVE;
                    parentUser.modifiedAt = new Date(Date.now());
                    parentUser.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    // Update Expert schema
                    expert.isDeleted = true;
                    expert.deletedByAdmin = true;
                    expert.modifiedAt = new Date(Date.now());
                    expert.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    await userRepository.updateUser(expert.user.id, parentUser);
                    await expertRepository.update(req.params.id, expert);
                    res.send({
                        message: "Expert has been deleted successfully!",
                    });
                }

            } else {
                failureResponse(ResponseMessages.expertDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}