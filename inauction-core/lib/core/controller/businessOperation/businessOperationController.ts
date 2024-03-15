import { BusinessOperationControllerHandler } from './businessOperationControllerHandler';
import { insufficientParameters,  errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import BusinessOperationRepository from '../../repository/businessOperation/businessOperationRepository';
import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { BusinessOperation, BusinessOperationStatus } from '../../schema/businessOperation';
import {IBusinessOperationRepository} from "../../repository/businessOperation/IBusinessOperationRepository";
import {AuthorizationCheck} from "../../../middlewares/authorizationCheck";

@injectable()
export class BusinessOperationController{

    // Create Business Operation
    public static async create_businessOperation(req: Request, res: Response) {

        let  businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        const handler = BusinessOperationControllerHandler.checkBusinessOperationCreationModel(req);

        if (handler) {

            let businessOperation: BusinessOperation = new BusinessOperation();
            businessOperation.status = BusinessOperationStatus.ACTIVE;
            businessOperation.name = handler.name;

            let timestamp: Date = new Date(Date.now());
            businessOperation.createdAt = timestamp;
            businessOperation.modifiedAt = timestamp;
            businessOperation.isDeleted = false;

            businessOperation.modifiedBy = AuthorizationCheck.getCurrentUser(req);

            const response = await  businessOperationRepository.create(businessOperation);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    // Get One Business Operation
    public static async get_businessOperation(req: Request, res: Response) {
        let  businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        if (req.params.id) {
            const businessOperation_filter = { id: req.params.id };
            businessOperationRepository.filterBusinessOperation(businessOperation_filter).then(data => {
                    res.send(data)
           }).catch(err => {
            errorResponse(err, res);
           });
        } else {
            insufficientParameters(res);
        }
    }

    // Get All Business Operations
    public static async get_businessOperations(req: Request, res: Response) {
        let  businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        const businessOperations = await businessOperationRepository.getAll();

        if (businessOperations.length > 0)
            res.send(businessOperations);
        else
            res.send([]);

    }

    // Get All Active Business Operations
    public static async get_businessOperationsCustomer(req: Request, res: Response) {
        let  businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        const businessOperations = await businessOperationRepository.getActive();

        if (businessOperations.length > 0)
            res.send(businessOperations);
        else
            res.send([]);

    }

    // Update Business Operation
    public static async update_businessOperation(req: Request, res: Response) {
        let businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        const handler = BusinessOperationControllerHandler.checkBusinessOperationCreationModel(req);
        if (handler && req.params.id) {
            const businessOperation_filter = { id: req.params.id };
            let businessOperation = await businessOperationRepository.filterBusinessOperation(businessOperation_filter);
            if (businessOperation) {
                businessOperation.name = handler.name;
                businessOperation.modifiedAt = new Date(Date.now());
                businessOperation.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await businessOperationRepository.updateBusinessOperation(req.params.id, businessOperation);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.businessOperationDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Business Operation Status
    public static async changeStatus_businessOperation(req: Request, res: Response) {
        let businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        if (req.params.id) {
            const businessOperation_filter = { id: req.params.id };
            let businessOperation = await  businessOperationRepository.filterBusinessOperation(businessOperation_filter);

            if (businessOperation) {

                // validate if status is sent in the request and it is different from that resource current status
                if (req.body.status && req.body.status !== businessOperation.status) {
                    businessOperation.status = req.body.status;
                    businessOperation.modifiedAt = new Date(Date.now());
                    businessOperation.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const response = await businessOperationRepository.updateBusinessOperation(req.params.id, businessOperation);
                    res.send(response);
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.businessOperationDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Business Operation
    public static async delete_businessOperation(req: Request, res: Response) {
        let businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        if (req.params.id) {
            const businessOperation_filter = { id: req.params.id };
            let businessOperation = await  businessOperationRepository.filterBusinessOperation(businessOperation_filter);
            if (businessOperation) {
                businessOperation.isDeleted = true;
                businessOperation.modifiedAt = new Date(Date.now());
                businessOperation.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await businessOperationRepository.updateBusinessOperation(req.params.id, businessOperation);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.businessOperationDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Get deleted Business Operations
    public static async get_deletedBusinessOperations(req: Request, res: Response) {
        let  businessOperationRepository: IBusinessOperationRepository = new BusinessOperationRepository(BusinessOperation);
        const businessOperations = await businessOperationRepository.getDeleted();

        if (businessOperations.length > 0)
            res.send(businessOperations);
        else
            res.send([]);
    }
}
