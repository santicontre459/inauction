import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { ILotRepository } from './ILotRepository';
import { injectable } from 'inversify';
import { Lot } from "./../../schema/lot";

@EntityRepository(Lot)
export default class LotRepository extends BaseRepository<Lot> implements ILotRepository {

    public async findById(id: string): Promise<Lot> {
        const repository = getRepository(Lot);
        return await repository.findOne(id);
    }

    public async filterLot(filter: any): Promise<Lot> {
        const repository = getRepository(Lot);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<Lot>>  {
        const repository = getRepository(Lot);       
        return await repository.find();
    }

    public async updateLot(lot_id: string, lot_params: Lot):Promise<Lot> {
        const repository = getRepository(Lot);   
        await repository.update(lot_id, lot_params);
        return await repository.findOne(lot_id);
    }

    public async deleteLot(id: string):Promise<any> {
        const repository = getRepository(Lot);   
        return await repository.softDelete(id);
    }

}