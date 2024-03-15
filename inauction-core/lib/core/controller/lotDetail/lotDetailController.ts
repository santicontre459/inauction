import { LotDetailControllerHandler } from './lotDetailControllerHandler';
import { ILotRepository } from '../../repository/lot/ILotRepository';
import LotRepository from '../../repository/lot/LotRepository';
import { ILotDetailRepository } from '../../repository/lotDetail/ILotDetailRepository';
import LotDetailRepository from '../../repository/lotDetail/LotDetailRepository';
import { IUomRepository } from '../../repository/uom/IUomRepository';
import UomRepository from '../../repository/uom/uomRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { LotDetail } from '../../schema/lotDetails';
import { Lot } from '../../schema/lot';
import { Uom } from '../../schema/uom';
import { AuthorizationCheck } from '../../../middlewares/authorizationCheck';


export class LotController{   

    public static async create_lotDetail(req: Request, res: Response) {
        let lotDetailRepository: ILotDetailRepository = new LotDetailRepository(LotDetail);
        let lotRepository: ILotRepository = new LotRepository(Lot);
        let uomRepository: IUomRepository = new UomRepository(Uom);
        const userId = AuthorizationCheck.getCurrentUser(req);

        var handler = LotDetailControllerHandler.checkLotDetailCreationModel(req);
        const lot = await lotRepository.findById(req.body.lotId);
        const uom = await uomRepository.findById(req.body.uomid);
        if(!lot){
            return failureResponse(ResponseMessages.lotDoesNotExist, null, res);
        }
        if(!uom){
            return failureResponse(ResponseMessages.uomDoesNotExist, null, res);
        }
        if(handler) {
            let lotDetail: LotDetail = new LotDetail();
            lotDetail.title = handler.title;
            lotDetail.lot = lot;
            lotDetail.uom = uom;
            lotDetail.quantity = handler.quantity;
            lotDetail.current_price = handler.current_price;
            lotDetail.qualification_price = handler.qualification_price;
            lotDetail.current_value = handler.current_value;
            lotDetail.qualification_value = handler.qualification_value;

            let timestamp: Date = new Date(Date.now());
            lotDetail.createdAt = timestamp;
            lotDetail.modifiedAt = timestamp;
            lotDetail.isDeleted = false;
            lotDetail.modifiedBy = userId;
            var response = await  lotDetailRepository.create(lotDetail);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_lotDetail(req: Request, res: Response) {
        let lotDetailRepository: ILotDetailRepository = new LotDetailRepository(LotDetail);
        if (req.params.id) {
            const lotDetail_filter = { id: req.params.id };
            
            await lotDetailRepository.filterLotDetail(lotDetail_filter).then(data => {
            if(data){
                res.send(data);
            }else{
                failureResponse(ResponseMessages.lotDetailDoesNotExist, null, res);
            }
       }).catch(err => {
            errorResponse(err, res);
       });

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_lotDetails(req: Request, res: Response) {
        let lotDetailRepository: ILotDetailRepository = new LotDetailRepository(LotDetail);
        let lotRepository: ILotRepository = new LotRepository(Lot);
        const lot = await lotRepository.findById(req.body.lotId);
        if(!lot){
            return failureResponse(ResponseMessages.lotDoesNotExist, null, res);
        }
        const lotDetail_filter = { lotId: lot.id };
        await lotDetailRepository.filterLotDetail(lotDetail_filter).then(data => {
            if(data){
                res.send(data);
            }else{
                failureResponse(ResponseMessages.lotDetailsDoNotExist, null, res);
            }
       }).catch(err => {
            errorResponse(err, res);
       });
    }

    public static async update_lotDetail(req: Request, res: Response) {
        let lotDetailRepository: ILotDetailRepository = new LotDetailRepository(LotDetail);
        let lotRepository: ILotRepository = new LotRepository(Lot);
        let uomRepository: IUomRepository = new UomRepository(Uom);
        const userId = AuthorizationCheck.getCurrentUser(req);

        var handler = LotDetailControllerHandler.checkLotDetailCreationModel(req);
        const lot = await lotRepository.findById(req.body.lotId);
        const uom = await uomRepository.findById(req.body.uomId);

        if(handler && req.params.id && event) {
            const lot_filter = { id: req.params.id };
            let lotDetail = await lotDetailRepository.filterLotDetail(lot_filter);
            if(lotDetail){
                lotDetail.title = req.body.title;
                lotDetail.lot = lot;
                lotDetail.uom = uom;
                lotDetail.quantity = handler.quantity;
                lotDetail.current_price = handler.current_price;
                lotDetail.qualification_price = handler.qualification_price;
                lotDetail.current_value = handler.current_value;
                lotDetail.qualification_value = handler.qualification_value;

                lotDetail.modifiedAt = new Date(Date.now());
                lotDetail.modifiedBy = userId;

                var response = await lotDetailRepository.updateLotDetail(req.params.id, lotDetail);
                res.send(response);

            }else{
                failureResponse(ResponseMessages.lotDetailDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public static async delete_lotDetail(req: Request, res: Response) {
        let lotDetailRepository: ILotDetailRepository = new LotDetailRepository(LotDetail);
        const userId = AuthorizationCheck.getCurrentUser(req);
        if(req.params.id) {
            const lotDetail_filter = { id: req.params.id };
            let lotDetail = await  lotDetailRepository.filterLotDetail(lotDetail_filter);
            if(lotDetail){
                lotDetail.isDeleted = true;
                lotDetail.modifiedAt = new Date(Date.now());
                lotDetail.modifiedBy = userId;

                var response = await lotDetailRepository.updateLotDetail(req.params.id, lotDetail);
                res.send(response);

            }else{
                failureResponse(ResponseMessages.lotDetailDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }    
    }
}
