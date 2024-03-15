import { IUom } from "core/models/uom/IUom";
import { Request } from 'express';
export class UomControllerHandler {

    public static checkUomCreationModel(req: Request) : IUom | false   {
        if ( req.body.title ) {
            const uom : IUom = {
                title:req.body.title
            };
            return uom;
        } else
            return false;
    }

}