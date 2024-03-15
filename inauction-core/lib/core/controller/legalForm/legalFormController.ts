import { LegalFormControllerHandler } from './legalFormControllerHandler';
import { insufficientParameters,  errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import LegalFormRepository from '../../repository/legalForm/legalFormRepository';
import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { LegalForm } from '../../schema/legalForm';
import { ILegalFormRepository } from "../../repository/legalForm/ILegalFormRepository";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

@injectable()
export class LegalFormController{

    // Create Legal Form
    public static async create_legalForm(req: Request, res: Response) {

        let  legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        const handler = LegalFormControllerHandler.checkLegalFormCreationModel(req);

        if (handler) {

            let legalForm: LegalForm = new LegalForm();

            legalForm.title = handler.title;
            legalForm.description = handler.description;

            let timestamp: Date = new Date(Date.now());
            legalForm.createdAt = timestamp;
            legalForm.modifiedAt = timestamp;
            legalForm.isDeleted = false;

            legalForm.modifiedBy = AuthorizationCheck.getCurrentUser(req);

            const response = await  legalFormRepository.create(legalForm);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    // Get One Legal Form
    public static async get_legalForm(req: Request, res: Response) {
        let  legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        if (req.params.id) {
            const legalForm_filter = { id: req.params.id };
            legalFormRepository.filterLegalForm(legalForm_filter).then(data => {
                    res.send(data)
           }).catch(err => {
            errorResponse(err, res);
           });
        } else {
            insufficientParameters(res);
        }
    }

    // Get All Legal Forms
    public static async get_legalForms(req: Request, res: Response) {
        let  legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        const legalForms = await legalFormRepository.getAll();

        if (legalForms.length > 0)
            res.send(legalForms);
        else
            res.send([]);

    }

    // Get All Active Legal Forms
    public static async get_legalFormsCustomer(req: Request, res: Response) {
        let  legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        const legalForms = await legalFormRepository.getActive();

        if (legalForms.length > 0)
            res.send(legalForms);
        else
            res.send([]);

    }

    // Update Legal Form
    public static async update_legalForm(req: Request, res: Response) {
        let legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        const handler = LegalFormControllerHandler.checkLegalFormCreationModel(req);
        if (handler && req.params.id) {
            const legalForm_filter = { id: req.params.id };
            let legalForm = await legalFormRepository.filterLegalForm(legalForm_filter);
            if (legalForm) {
                legalForm.title = handler.title;
                legalForm.description = handler.description;
                legalForm.modifiedAt = new Date(Date.now());
                legalForm.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await legalFormRepository.updateLegalForm(req.params.id, legalForm);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.legalFormDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Legal Form Status
    public static async changeStatus_legalForm(req: Request, res: Response) {
        let legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        if (req.params.id) {
            const legalForm_filter = { id: req.params.id };
            let legalForm = await  legalFormRepository.filterLegalForm(legalForm_filter);

            if (legalForm) {

                // validate if status is sent in the request and it is different from that resource current status
                if (req.body.status && req.body.status !== legalForm.status) {
                    legalForm.status = req.body.status;
                    legalForm.modifiedAt = new Date(Date.now());
                    legalForm.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                    const response = await legalFormRepository.updateLegalForm(req.params.id, legalForm);
                    res.send(response);
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.legalFormDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Legal Form
    public static async delete_legalForm(req: Request, res: Response) {
        let legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        if (req.params.id) {
            const legalForm_filter = { id: req.params.id };
            let legalForm = await  legalFormRepository.filterLegalForm(legalForm_filter);
            if (legalForm) {
                legalForm.isDeleted = true;
                legalForm.modifiedAt = new Date(Date.now());
                legalForm.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await legalFormRepository.updateLegalForm(req.params.id, legalForm);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.legalFormDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Get deleted Legal Forms
    public static async get_deletedLegalForms(req: Request, res: Response) {
        let  legalFormRepository: ILegalFormRepository = new LegalFormRepository(LegalForm);
        const legalForms = await legalFormRepository.getDeleted();

        if (legalForms.length > 0)
            res.send(legalForms);
        else
            res.send([]);

    }
}
