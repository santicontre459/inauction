import { getManager } from "typeorm";
import { LotControllerHandler } from './lotControllerHandler';
import { LotDetailControllerHandler } from '../lotDetail/lotDetailControllerHandler';
import { ILotRepository } from '../../repository/lot/ILotRepository';
import LotRepository from '../../repository/lot/LotRepository';
import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { Lot } from '../../schema/lot';
import { LotDetail } from '../../schema/lotDetails';
import { Event, LotType } from '../../schema/event';
import { IUom } from "core/models/uom/IUom";
import { IUomRepository } from "../../repository/uom/IUomRepository";
import UomRepository from "../../repository/uom/uomRepository";
import { Uom } from "core/schema/uom";
import { AuthorizationCheck } from '../../../middlewares/authorizationCheck';

export class LotController {

    public static async create_lot_draft(req: Request, res: Response) {
        return await getManager().transaction(async transactionalEntityManager => {
            // let lotRepository: ILotRepository   = transactionalEntityManager.getCustomRepository(LotRepository);
            let eventRepository: IEventRepository = transactionalEntityManager.getCustomRepository(EventRepository)
            let uomRepository: IUomRepository = transactionalEntityManager.getCustomRepository(UomRepository)
            const userId = AuthorizationCheck.getCurrentUser(req);

            let event = await eventRepository.findById(req.body.eventid);
            if (!event) {
                throw failureResponse(ResponseMessages.eventDoesNotExist, null, res);
            }
            let timestamp: Date = new Date(Date.now());
            req.body.lots.forEach(item => {
                var handler = LotControllerHandler.checkLotDraftModel(item);
                if (handler) {
                    let lot: Lot = new Lot();
                    lot.title = handler.lotName;
                    lot.event = event;
                    lot.createdAt = timestamp;
                    lot.modifiedAt = timestamp;
                    lot.isDeleted = false;
                    lot.modifiedBy = userId;
                    transactionalEntityManager.save(lot);

                    handler.data.forEach(async item_data => {
                        var lotDetailhandler = LotDetailControllerHandler.checkLotDetailDraftModel(item_data);
                        const uom = await uomRepository.findById(lotDetailhandler.uomid);
                        if (!uom) {
                            throw failureResponse(ResponseMessages.uomDoesNotExist, null, res);
                        }
                        if (lotDetailhandler) {
                            let lotDetail: LotDetail = new LotDetail();
                            lotDetail.title = lotDetailhandler.title;
                            lotDetail.lot = lot;
                            lotDetail.uom = uom;
                            lotDetail.quantity = lotDetailhandler.quantity;
                            lotDetail.current_price = lotDetailhandler.current_price;
                            lotDetail.qualification_price = lotDetailhandler.qualification_price;
                            lotDetail.current_value = lotDetailhandler.current_value;
                            lotDetail.qualification_value = lotDetailhandler.qualification_value;

                            lotDetail.createdAt = timestamp;
                            lotDetail.modifiedAt = timestamp;
                            lotDetail.isDeleted = false;
                            lotDetail.modifiedBy = userId;
                            transactionalEntityManager.save(lotDetail);
                        } else {
                            return insufficientParameters(res);
                        }
                    })
                } else {
                    throw insufficientParameters(res);
                }
            })

            event.lotType = req.body.lotType;
            event = await eventRepository.updateEvent(event.id, event);
            res.send({
                data: event
            });
        })
    }

    public static async create_lot(req: Request, res: Response) {

        let lotRepository: ILotRepository = new LotRepository(Lot);
        let eventRepository: IEventRepository = new EventRepository(Event);

        var handler = LotControllerHandler.checkLotCreationModel(req);

        const event = await { ...eventRepository.findById(req.body.eventid) };
        const userId = AuthorizationCheck.getCurrentUser(req);

        if (handler && event) {

            let lot: Lot = new Lot();
            lot.title = req.body.title;
            lot.event = event;
            lot.total_current_value = req.body.total_current_value;
            lot.total_current_qualification_value = req.body.total_current_qualification_value;

            let timestamp: Date = new Date(Date.now());
            lot.createdAt = timestamp;
            lot.modifiedAt = timestamp;
            lot.isDeleted = false;
            lot.modifiedBy = userId;
            var response = await lotRepository.create(lot);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_lot(req: Request, res: Response) {
        let lotRepository: ILotRepository = new LotRepository(Lot);
        if (req.params.id) {
            const lot_filter = { id: req.params.id };

            await lotRepository.filterLot(lot_filter).then(data => {
                if (data) {
                    res.send(data);
                } else {
                    failureResponse(ResponseMessages.lotDoesNotExist, null, res);
                }
            }).catch(err => {
                errorResponse(err, res);
            });

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_lots(req: Request, res: Response) {
        let lotRepository: ILotRepository = new LotRepository(Lot);
        var lots = await lotRepository.getAll();

        if (lots.length > 0)
            res.send(lots);
        else
            res.send([]);

    }

    public static async update_lot(req: Request, res: Response) {
        let lotRepository: ILotRepository = new LotRepository(Lot);
        let eventRepository: IEventRepository = new EventRepository(Event);

        var handler = LotControllerHandler.checkLotCreationModel(req);
        const event = await { ...eventRepository.findById(req.body.eventid) };
        const userId = AuthorizationCheck.getCurrentUser(req);

        if (handler && req.params.id && event) {
            const lot_filter = { id: req.params.id };
            let lot = await lotRepository.filterLot(lot_filter);
            if (lot) {
                lot.title = req.body.title;
                lot.event = event;
                lot.total_current_value = req.body.total_current_value;
                lot.total_current_qualification_value = req.body.total_current_qualification_value;

                lot.modifiedAt = new Date(Date.now());
                lot.modifiedBy = userId;

                var response = await lotRepository.updateLot(req.params.id, lot);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.lotDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public static async delete_lot(req: Request, res: Response) {
        let lotRepository: ILotRepository = new LotRepository(Lot);
        const userId = AuthorizationCheck.getCurrentUser(req);
        if (req.params.id) {
            const lot_filter = { id: req.params.id };
            let lot = await lotRepository.filterLot(lot_filter);
            if (lot) {
                lot.isDeleted = true;
                lot.modifiedAt = new Date(Date.now());
                lot.modifiedBy = userId;

                var response = await lotRepository.updateLot(req.params.id, lot);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.lotDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}