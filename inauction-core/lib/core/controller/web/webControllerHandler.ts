import { IHostRegistrationForm } from '../../models/hostRegistrationForm/IHostRegistrationForm';
import { Request } from 'express';

export class WebControllerHandler {

    /**
     * Check fields required for Host Registration Form
     * @param req
     */
    public static async checkHostRegistrationFormModel(req: Request): Promise<IHostRegistrationForm | false> {

        if (req.body.entity_name
            && req.body.entity_email
            && req.body.entity_phone_number
            && req.body.entity_representative_full_name
            && req.body.entity_business_operation_id
            && req.body.entity_average_yearly_turnover
            && req.body.entity_business_registration_number
        ) {

            return {
                entityName: req.body.entity_name,
                entityEmail: req.body.entity_email,
                entityPhoneNumber: req.body.entity_phone_number,
                entityLegalRepresentativeFullName: req.body.entity_representative_full_name,
                entityBusinessOperation: req.body.entity_business_operation_id,
                entityAverageYearlyTurnover: req.body.entity_average_yearly_turnover,
                entityBusinessRegNumber: req.body.entity_business_registration_number,

            };
        } else
            return false;
    }
}