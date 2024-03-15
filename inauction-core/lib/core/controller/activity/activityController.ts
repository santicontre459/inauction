import { ActivityControllerHandler } from './activityControllerHandler';
import { IActivityRepository } from '../../repository/activity/IAcitivityRepository';
import { ICategoryRepository } from '../../repository/category/ICategoryRepository';
import ActivityRepository from '../../repository/activity/activityRepository';
import CategoryRepository from '../../repository/category/categoryRepository';
import { Activity, ActivityStatus } from '../../schema/activity';
import { Category } from '../../schema/category';
import { Request, Response } from 'express';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { ITaskName, ITaskType } from "../../models/task/ITask";
import { IActivity } from "../../models/activity/IActivity";
import { ICategoryModel } from "../../models/category/ICategory";
import UserRepository from '../../repository/user/userRepository';
import { User } from '../../schema/user';
import { CompanyActivity } from '../../schema/companyActivity';
import { getManager, getRepository } from 'typeorm';

export class ActivityController {

    // Create Activity
    public static async create_activity(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);

        const handler = ActivityControllerHandler.checkActivityCreationModel(req);
        const category = await { ...categoryRepository.findById(req.body.category_id) };

        if (handler && category) {
            let activity: Activity = new Activity();

            activity.name = handler.name;
            activity.code = handler.code;
            activity.category = category;
            activity.status = ActivityStatus.ACTIVE;
            let timestamp: Date = new Date(Date.now());
            activity.createdAt = timestamp;
            activity.modifiedAt = timestamp;
            activity.isDeleted = false;
            activity.modifiedBy = AuthorizationCheck.getCurrentUser(req);
            const response = await activityRepository.create(activity);
            res.send(response);
        } else {
            insufficientParameters(res);
        }
    }

    // Get One Activity
    public static async get_activity(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);

        if (req.params.id) {
            const activity_filter = { id: req.params.id };
            await activityRepository.filterActivity(activity_filter).then(data => {
                if (data) {
                    res.send(data);
                } else {
                    failureResponse(ResponseMessages.activityDoesNotExist, null, res);
                }
            }).catch(err => {
                errorResponse(err, res);
            });
        } else {
            insufficientParameters(res);
        }
    }

    // Get All Activities
    public static async get_activities(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        const activities = await activityRepository.getAll();

        if (activities.length > 0)
            res.send(activities);
        else
            res.send([]);
    }

    // Get All Active Activities
    public static async get_activitiesCustomer(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);
        const activities = await activityRepository.getActive();
        const categories = await categoryRepository.getActive();

        let activitiesResponse: Array<ICategoryModel> = [];

        // Group Activities by categories
        categories.forEach(category => {

            let activityResponse = activities.filter(f => f.category.id == category.id);
            let activityMatch: Array<IActivity> = [];

            activityResponse.forEach(activity => {
                let activityItem: IActivity = {
                    id: activity.id,
                    code: activity.code,
                    name: activity.name
                };
                activityMatch.push(activityItem);
            });

            let categoryParent: ICategoryModel = {
                id: category.id,
                name: category.name,
                code: category.code,
                activities: activityMatch
            };
            activitiesResponse.push(categoryParent);
        });

        res.send(activitiesResponse);
    }

    // Update Activity
    public static async update_activity(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);

        const handler = ActivityControllerHandler.checkActivityCreationModel(req);
        const category = await { ...categoryRepository.findById(req.body.category_id) };

        if (handler && req.params.id) {
            const activity_filter = { id: req.params.id };
            let activity = await activityRepository.filterActivity(activity_filter);
            if (activity) {
                activity.name = handler.name;
                activity.code = handler.code;
                activity.category = category;
                activity.modifiedAt = new Date(Date.now());
                activity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await activityRepository.updateActivity(req.params.id, activity);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.activityDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Activity Status
    public static async changeStatus_activity(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        if (req.params.id) {
            const activity_filter = { id: req.params.id };
            let activity = await activityRepository.filterActivity(activity_filter);

            if (activity) {

                // validate if status is sent in the request and it is different from that resource current status
                if (req.body.status && req.body.status !== activity.status) {
                    activity.status = req.body.status;
                    activity.modifiedAt = new Date(Date.now());
                    activity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const response = await activityRepository.updateActivity(req.params.id, activity);
                    res.send(response);
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.activityDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Activity
    public static async delete_activity(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        if (req.params.id) {
            const activity_filter = { id: req.params.id };
            let activity = await activityRepository.filterActivity(activity_filter);
            if (activity) {
                activity.isDeleted = true;
                activity.modifiedAt = new Date(Date.now());
                activity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await activityRepository.updateActivity(req.params.id, activity);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.activityDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // add company Activity
    public static async add_activity_to_company(req: Request, res: Response) {
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        let userRepository = new UserRepository(User);
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        let user = await userRepository.findById(requestUser);
        const activity = await activityRepository.findById(req.body.activity_id);
        if (user.company) {
            if (activity) {
                let company_activity: CompanyActivity = new CompanyActivity();

                company_activity.company = user.company;
                company_activity.activity = activity;
                let timestamp: Date = new Date(Date.now());
                company_activity.createdAt = timestamp;
                company_activity.modifiedAt = timestamp;
                company_activity.isDeleted = false;
                company_activity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const repository = getRepository(CompanyActivity);
                const response = await repository.save(company_activity);
                res.send(response);
            } else {
                insufficientParameters(res);
            }
        }
        else {
            failureResponse(ResponseMessages.companyDoesNotExist, null, res);
        }
    }

    // Get All Active Activities
    public static async getCompanyActivities(req: Request, res: Response) {
        if (req.params.company_id) {
            let company_activities = await getManager().query(
                `SELECT 
                "Activity".* , 
                "Category".id as category_id,
                "Category".name as category_name
            FROM "Activity" 
            LEFT JOIN "Category" on "Activity"."categoryId" = "Category".id
            WHERE "Activity"."isDeleted" = false
            AND "Activity".status = 1 
            AND "Activity".id IN (
                SELECT "activityId"
                FROM "CompanyActivity"
                where "CompanyActivity"."companyId" = $1
            )
            `,
                [req.params.company_id]
            );
            res.send(company_activities);
        }
        else {
            insufficientParameters(res);
        }
    }


    // Delete Company Activity
    public static async remove_activity_company(req: Request, res: Response) {
        if (req.params.id) {
            const repository = getRepository(CompanyActivity);

            let company_activity = await repository.findOne({where: {activity : req.params.id}});
            if (company_activity) {
                const response = await repository.delete(company_activity.id);
                res.send({success : true});
            } else {
                failureResponse(ResponseMessages.activityDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

}