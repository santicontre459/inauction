import { ILot, ILotDraft } from "core/models/lot/ILot";
import { Request, Response } from 'express';

export class LotControllerHandler {

    public static checkLotCreationModel(req: Request): ILot | false {
        if (req.body.type
            && req.body.title
            && req.body.eventid
            && req.body.total_current_value
            && req.body.total_current_qualification_value
        ) {
            var lot: ILot = {
                type: req.body.type,
                title: req.body.title,
                eventid: req.body.eventid,
                total_current_value: req.body.total_current_value,
                total_current_qualification_value: req.body.total_current_qualification_value,
            }
            return lot;
        } else
            return false;
    }

    public static checkLotDraftModel(body: any): ILotDraft | false {
        if (body.lotName && Array.isArray(body.data)
        ) {
            var lot: ILotDraft = {
                lotName: body.lotName,
                data: body.data,
            }
            return lot;
        } else
            return false;
    }
}