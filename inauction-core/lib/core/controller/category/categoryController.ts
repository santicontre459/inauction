import { CategoryControllerHandler } from './categoryControllerHandler';
import { ICategoryRepository } from '../../repository/category/ICategoryRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import CategoryRepository from '../../repository/category/categoryRepository';
import { Category, CategoryStatus } from '../../schema/category';
import { Activity } from '../../schema/activity';
import { Request, Response } from 'express';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import ActivityRepository from '../../repository/activity/activityRepository';
import {IActivityRepository} from "../../repository/activity/IAcitivityRepository";

export class CategoryController {

    // Create Category
    public static async create_category(req: Request, res: Response) {
        let  categoryRepository: ICategoryRepository = new CategoryRepository(Category);
        const handler = CategoryControllerHandler.checkCategoryCreationModel(req);
        
        if (handler) {

            let categoryEntity: Category = new Category();

            categoryEntity.name = handler.name;
            categoryEntity.code = handler.code;
            categoryEntity.status = CategoryStatus.ACTIVE;
                        
            let timestamp: Date = new Date(Date.now());
            categoryEntity.createdAt = timestamp;
            categoryEntity.modifiedAt = timestamp;
            categoryEntity.isDeleted = false;
            categoryEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);
            const response = await  categoryRepository.create(categoryEntity);
            res.send(response);
        } else {
            insufficientParameters(res);
        }
    }

    // Get One Category
    public static async get_category(req: Request, res: Response) {
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);

        if (req.params.id) {

            const category_filter = { id: req.params.id };
            await categoryRepository.filterCategory(category_filter).then(data => {
                if (data) {
                    res.send(data);
                } else {
                    failureResponse(ResponseMessages.categoryDoesNotExist, null, res);
                }
           }).catch(err => {
            errorResponse(err, res);
           });

        } else {
            insufficientParameters(res);
        }
    }

    // Get All Categories
    public static async get_categories(req: Request, res: Response) {
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);

        const categories = await categoryRepository.getAll();

        if (categories.length > 0)
            res.send(categories);
        else
            res.send([]);

    }

    // Get Active Categories
    public static async get_active_categories(req: Request, res: Response) {
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);

        const categories = await categoryRepository.getActive();

        if (categories.length > 0)
            res.send(categories);
        else
            res.send([]);

    }

    // Update Category
    public static async update_category(req: Request, res: Response) {
        let  categoryRepository: ICategoryRepository = new CategoryRepository(Category);
        const handler = CategoryControllerHandler.checkCategoryCreationModel(req);
        
        if (handler && req.params.id) {
            const category_filter = { id: req.params.id };
            let categoryEntity = await categoryRepository.filterCategory(category_filter);
            if (categoryEntity) {
                
                categoryEntity.name = handler.name;
                categoryEntity.code = handler.code;

                categoryEntity.modifiedAt = new Date(Date.now());
                categoryEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await categoryRepository.updateCategory(req.params.id, categoryEntity);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.categoryDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Category Status
    public static async changeStatus_category(req: Request, res: Response) {
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);

        if (req.params.id) {
            const category_filter = { id: req.params.id };
            let categoryEntity = await categoryRepository.filterCategory(category_filter);

            if (categoryEntity) {

                // todo: fix error: { error: could not determine data type of parameter $1
                const activity_category_filter = { category: req.params.id };
                let activityEntity =  await  activityRepository.filterActivity(activity_category_filter);

                if (activityEntity) {
                    failureResponse(ResponseMessages.statusNotChangeable, null, res);
                }
                else {
                    // validate if status is sent in the request and it is different from that resource current status
                    if (req.body.status && req.body.status !== categoryEntity.status) {
                        categoryEntity.status = req.body.status;
                        categoryEntity.modifiedAt = new Date(Date.now());
                        categoryEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        const response = await categoryRepository.updateCategory(req.params.id, categoryEntity);
                        res.send(response);
                    }
                    else {
                        failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                    }
                }


            } else {
                failureResponse(ResponseMessages.categoryDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Category
    public static async delete_category(req: Request, res: Response) {
        let categoryRepository: ICategoryRepository = new CategoryRepository(Category);
        let activityRepository: IActivityRepository = new ActivityRepository(Activity);
        if (req.params.id) {

                const category_filter = { id: req.params.id };
                let categoryEntity = await  categoryRepository.filterCategory(category_filter);
                if (categoryEntity) {

                    // todo: fix error: { error: could not determine data type of parameter $1
                    const activity_category_filter = { category: req.params.id };
                    let activityEntity =  await  activityRepository.filterActivity(activity_category_filter);

                    if (activityEntity) {
                        failureResponse(ResponseMessages.categoryNotDeletable, null, res);
                    }
                    else {
                        categoryEntity.isDeleted = true;
                        categoryEntity.modifiedAt = new Date(Date.now());
                        categoryEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                        const response = await categoryRepository.updateCategory(req.params.id, categoryEntity);
                        res.send(response);
                    }

                } else {
                    failureResponse(ResponseMessages.categoryDoesNotExist, null, res);
                }


        } else {
            insufficientParameters(res);
        } 
    }
}