import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IRFQRepository} from './IRFQRepository';
import { injectable } from 'inversify';
import { Rfq } from "./../../schema/rfq";

export default class RFQRepository extends BaseRepository<Rfq> implements IRFQRepository {

    public async findById(id: string): Promise<Rfq> {
        const repository = getRepository(Rfq);
        return await repository.findOne(id);
    }

    public async filterRfq(filter: any): Promise<Rfq> {
        const repository = getRepository(Rfq);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<Rfq>>  {
        const repository = getRepository(Rfq);       
        return await repository.find();
    }

    public async updateRfq(rfq_id: string, rfq_params: Rfq):Promise<Rfq> {
        const repository = getRepository(Rfq);   
        await repository.update(rfq_id, rfq_params);
        return await repository.findOne(rfq_id);
    }

    public async deleteRfq(id: string):Promise<any> {
        const repository = getRepository(Rfq);   
        return await repository.softDelete(id);
    }

}