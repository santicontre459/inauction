import { ILegalForm } from "core/models/legalForm/ILegalForm";
import { Request } from 'express';
export class LegalFormControllerHandler {

    public static checkLegalFormCreationModel(req: Request) : ILegalForm | false   {
        if ( req.body.title && req.body.description) {
            const legalForm : ILegalForm = {
                title: req.body.title,
                description: req.body.description
            };
            return legalForm;
        } else
            return false;
    }

}