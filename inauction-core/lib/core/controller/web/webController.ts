import { ResponseMessages } from '../common/resource/Resource';
import { WebControllerHandler } from './webControllerHandler';
import { IHostRegistrationFormRepository } from '../../repository/hostRegistrationForm/IHostRegistrationFormRepository';
import {
    insufficientParameters,
    failureResponse
} from '../common/handler/responseHandler';
import HostRegistrationFormRepository from '../../repository/hostRegistrationForm/HostRegistrationFormRepository';
import { HostRegistrationForm } from '../../schema/hostRegistrationForm';
import { Request, Response } from 'express';
import { BusinessOperation } from "../../schema/businessOperation";
import { getRepository } from "typeorm";

export class WebController {

    // host registration form creation
    public static async create_host_registration_form(req: Request, res: Response) {

        let hostRegistrationFormRepository: IHostRegistrationFormRepository = new HostRegistrationFormRepository(HostRegistrationForm);
        let businessOperationRepository  = getRepository(BusinessOperation);

        const handler = await WebControllerHandler.checkHostRegistrationFormModel(req);

        if (handler) {

            let businessOperation = new BusinessOperation();


            await businessOperationRepository.findOne({ where: {id: req.body.entity_business_operation_id }})
                .then((business_operation_data: BusinessOperation) => {
                    // if business_operation_data inactive or deleted  company should not be created
                    if (business_operation_data.status === 0 || business_operation_data.isDeleted === true) {
                        businessOperation = null;
                    }
                    else {
                        businessOperation = business_operation_data;
                    }
                }).catch(() => { businessOperation = null; });

            // check if business operation exists
            if (!businessOperation) {
                failureResponse(ResponseMessages.businessOperationDoesNotExist, null, res);
                return false;
            }

            // host registration form create
            let hostRegistrationFormEntity: HostRegistrationForm = new HostRegistrationForm();
            hostRegistrationFormEntity.entityName = handler.entityName;
            hostRegistrationFormEntity.entityEmail = handler.entityEmail;
            hostRegistrationFormEntity.entityPhoneNumber = handler.entityPhoneNumber;
            hostRegistrationFormEntity.entityLegalRepresentativeFullName = handler.entityLegalRepresentativeFullName;
            hostRegistrationFormEntity.entityBusinessOperation = businessOperation;
            hostRegistrationFormEntity.entityAverageYearlyTurnover = handler.entityAverageYearlyTurnover;
            hostRegistrationFormEntity.entityBusinessRegNumber = handler.entityBusinessRegNumber;
            hostRegistrationFormEntity.createdAt = new Date(Date.now());
            hostRegistrationFormEntity.modifiedAt = new Date(Date.now());

            const hostRegistrationFormResponse = await hostRegistrationFormRepository.create(hostRegistrationFormEntity);
            res.status(200).send({
                message: 'Host Registration Form has been created successfully!',
                data: hostRegistrationFormResponse
            });

        } else {
            insufficientParameters(res);
        }
    }

    // get list of host registration forms
    public static async get_host_registration_forms(req: Request, res: Response) {

        let hostRegistrationFormRepository: HostRegistrationFormRepository = new HostRegistrationFormRepository(HostRegistrationForm);
        const hostRegistrationForms = await hostRegistrationFormRepository.getAll();

        if (hostRegistrationForms.length > 0)
            res.status(200).send({ data: hostRegistrationForms });
        else
            res.status(200).send({ data: [] });

    }

}