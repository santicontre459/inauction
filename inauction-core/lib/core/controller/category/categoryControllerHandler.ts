import { ICategoryModel } from "core/models/category/ICategory";
import { Request, Response } from 'express';

export class CategoryControllerHandler {

    public static checkCategoryCreationModel(req: Request) : ICategoryModel | false   {
        if( req.body.name
            && req.body.code )
            {
                var category : ICategoryModel = {
                    name:req.body.name,
                    code: req.body.code,
                }
                return category;
            } else 
            return false;
    }
   

}