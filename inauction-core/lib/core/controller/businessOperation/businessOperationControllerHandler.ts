import { IBusinessOperation } from "core/models/businessOperation/IBusinessOperation";
import { Request } from 'express';
export class BusinessOperationControllerHandler {

    public static checkBusinessOperationCreationModel(req: Request) : IBusinessOperation | false   {
        if ( req.body.name ) {
            const businessOperation : IBusinessOperation = {
                name:req.body.name
            };
            return businessOperation;
        } else
            return false;
    }

}