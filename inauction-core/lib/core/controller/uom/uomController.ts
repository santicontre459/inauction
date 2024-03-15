import { UomControllerHandler } from './uomControllerHandler';
import { insufficientParameters,  errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import UomRepository from '../../repository/uom/uomRepository';
import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { Uom } from '../../schema/uom';
import { IUomRepository } from "../../repository/uom/IUomRepository";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

@injectable()
export class UomController{

    // Create Uom
    public static async create_uom(req: Request, res: Response) {

        let  uomRepository: IUomRepository = new UomRepository(Uom);
        const handler = UomControllerHandler.checkUomCreationModel(req);
        
        if (handler) {

            let uom: Uom = new Uom();

            uom.title = handler.title;

            let timestamp: Date = new Date(Date.now());
            uom.createdAt = timestamp;
            uom.modifiedAt = timestamp;
            uom.isDeleted = false;

            uom.modifiedBy = AuthorizationCheck.getCurrentUser(req);
           
            const response = await  uomRepository.create(uom);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    // Get One Uom
    public static async get_uom(req: Request, res: Response) {
        let  uomRepository: IUomRepository = new UomRepository(Uom);
        if (req.params.id) {
            const uom_filter = { id: req.params.id };
            uomRepository.filterUom(uom_filter).then(data => {
                    res.send(data)
           }).catch(err => {
            errorResponse(err, res);
           });
        } else {
            insufficientParameters(res);
        }
    }

    // Get All Uoms
    public static async get_uoms(req: Request, res: Response) {
        let  uomRepository: IUomRepository = new UomRepository(Uom);
        const uoms = await uomRepository.getAll();

        if (uoms.length > 0)
            res.send(uoms);
        else
            res.send([]);

    }

    // Get All Active Uoms
    public static async get_uomsHost(req: Request, res: Response) {
        let  uomRepository: IUomRepository = new UomRepository(Uom);
        const uoms = await uomRepository.getActive();

        if (uoms.length > 0)
            res.send(uoms);
        else
            res.send([]);

    }

    // Update Uom
    public static async update_uom(req: Request, res: Response) {
        let uomRepository: IUomRepository = new UomRepository(Uom);
        const handler = UomControllerHandler.checkUomCreationModel(req);
        if (handler && req.params.id) {
            const uom_filter = { id: req.params.id };
            let uom = await uomRepository.filterUom(uom_filter);
            if (uom) {
                uom.title = handler.title;
                uom.modifiedAt = new Date(Date.now());
                uom.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await uomRepository.updateUom(req.params.id, uom);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.uomDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Uom Status
    public static async changeStatus_uom(req: Request, res: Response) {
        let uomRepository: IUomRepository = new UomRepository(Uom);
        if (req.params.id) {
            const uom_filter = { id: req.params.id };
            let uom = await  uomRepository.filterUom(uom_filter);

            if (uom) {

                // validate if status is sent in the request and it is different from that resource current status
                if (req.body.status && req.body.status !== uom.status) {
                    uom.status = req.body.status;
                    uom.modifiedAt = new Date(Date.now());
                    uom.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const response = await uomRepository.updateUom(req.params.id, uom);
                    res.send(response);
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.uomDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Uom
    public static async delete_uom(req: Request, res: Response) {
        let uomRepository: IUomRepository = new UomRepository(Uom);
        if (req.params.id) {
            const uom_filter = { id: req.params.id };
            let uom = await  uomRepository.filterUom(uom_filter);
            if (uom) {
                uom.isDeleted = true;
                uom.modifiedAt = new Date(Date.now());
                uom.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await uomRepository.updateUom(req.params.id, uom);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.uomDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Get deleted Uoms
    public static async get_deleted_uoms(req: Request, res: Response) {
        let  uomRepository: IUomRepository = new UomRepository(Uom);
        const uoms = await uomRepository.getDeleted();

        if (uoms.length > 0)
            res.send(uoms);
        else
            res.send([]);

    }
}