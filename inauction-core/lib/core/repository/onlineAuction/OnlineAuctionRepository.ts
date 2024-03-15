import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IOnlineAuctionRepository} from './IOnlineAuctionRepository';
import { injectable } from 'inversify';
import { OnlineAuction } from "./../../schema/onlineAuction";

export default class OnlineAuctionRepository extends BaseRepository<OnlineAuction> implements IOnlineAuctionRepository {

    public async findById(id: string): Promise<OnlineAuction> {
        const repository = getRepository(OnlineAuction);
        return await repository.findOne(id);
    }

    public async filterOnlineAuction(filter: any): Promise<OnlineAuction> {
        const repository = getRepository(OnlineAuction);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<OnlineAuction>>  {
        const repository = getRepository(OnlineAuction);       
        return await repository.find();
    }

    public async updateOnlineAuction(onlineAuction_id: string, onlineAuction_params: OnlineAuction):Promise<OnlineAuction> {
        const repository = getRepository(OnlineAuction);   
        await repository.update(onlineAuction_id, onlineAuction_params);
        return await repository.findOne(onlineAuction_id);
    }

    public async deleteOnlineAuction(id: string):Promise<any> {
        const repository = getRepository(OnlineAuction);   
        return await repository.softDelete(id);
    }

}