import { ICurrency } from "core/models/currency/ICurrency";
import { Request } from 'express';

export class CurrencyControllerHandler {

    public static checkCurrencyCreationModel(req: Request) : ICurrency | false   {
        if ( req.body.title
            && req.body.slug 
        ) {
            const currency : ICurrency = {
                title:req.body.title,
                slug: req.body.slug,
            };
            return currency;
        } else
            return false;
    }

}