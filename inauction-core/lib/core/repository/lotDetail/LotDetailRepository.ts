import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { ILotDetailRepository } from './ILotDetailRepository';
import { injectable } from 'inversify';
import { LotDetail } from "./../../schema/lotDetails";

@EntityRepository(LotDetail)
export default class LotDetailRepository extends BaseRepository<LotDetail> implements ILotDetailRepository {
    public async findById(id: string): Promise<LotDetail> {
        const repository = getRepository(LotDetail);
        return await repository.findOne(id);
    }

    public async filterLotDetail(filter: any): Promise<LotDetail> {
        const repository = getRepository(LotDetail);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<LotDetail>>  {
        const repository = getRepository(LotDetail);       
        return await repository.find();
    }

    public async updateLotDetail(lotDetail_id: string, lotDetail_params: LotDetail):Promise<LotDetail> {
        const repository = getRepository(LotDetail);   
        await repository.update(lotDetail_id, lotDetail_params);
        return await repository.findOne(lotDetail_id);
    }

    public async deleteLotDetail(id: string):Promise<any> {
        const repository = getRepository(LotDetail);   
        return await repository.softDelete(id);
    }

}