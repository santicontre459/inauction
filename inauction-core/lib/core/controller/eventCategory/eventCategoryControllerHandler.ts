import { IEventCategory } from "core/models/eventCategory/IEventCategory";
import { Request } from 'express';

export class EventCategoryControllerHandler {

    public static checkEventCategoryCreationModel(req: Request) : IEventCategory | false   {
        if ( req.body.name
            && req.body.description 
        ) {
            const eventCategory : IEventCategory = {
                name:req.body.name,
                description: req.body.description,
            };
            return eventCategory;
        } else
            return false;
    }

}