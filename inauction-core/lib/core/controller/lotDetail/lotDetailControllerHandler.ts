import { ILotDetail, ILotDetailDraft } from "core/models/lotDetail/ILotDetail";
import { Request, Response } from 'express';

export class LotDetailControllerHandler {

    public static checkLotDetailCreationModel(req: Request) : ILotDetail | false   {
        if( req.body.title 
            && req.body.lotid 
            && req.body.uomid 
            && req.body.quantity 
            && req.body.current_price 
            && req.body.qualification_price 
            && req.body.current_value 
            && req.body.qualification_value 
        ){
                var lotDetail : ILotDetail = {
                    title:req.body.title,
                    lotid: req.body.lotid,
                    uomid: req.body.uomid,
                    quantity: req.body.quantity,
                    current_price: req.body.current_price,
                    qualification_price: req.body.qualification_price,
                    current_value: req.body.current_value,
                    qualification_value: req.body.qualification_value,
                }
                return lotDetail;
            } else 
            return false;
    }

    public static checkLotDetailDraftModel(body: any) : ILotDetailDraft   {
        if( body.name 
            && body.uom
            && body.quantity
            && body.currentPrice
            && body.qualificationPrice
            && body.currentValue
            && body.qualificationValue
        ){
                var lotDetail : ILotDetailDraft = {
                    title: body.name,
                    uomid: body.uom,
                    quantity: body.quantity,
                    current_price: body.currentPrice,
                    qualification_price: body.qualificationPrice,
                    current_value: body.currentValue,
                    qualification_value: body.qualificationValue,
                }
                return lotDetail;
            } else 
            return null;
    }
}