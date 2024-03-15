import { IActivity } from "core/models/activity/IActivity";
import { Request } from 'express';

export class ActivityControllerHandler {

    public static checkActivityCreationModel(req: Request) : IActivity | false   {
        if( req.body.name
            && req.body.code
            && req.body.category_id
        ){
            const activity : IActivity = {
                name:req.body.name,
                code: req.body.code,
                category: req.body.category_id,
            };
            return activity;
        } else
            return false;
    }
   

}