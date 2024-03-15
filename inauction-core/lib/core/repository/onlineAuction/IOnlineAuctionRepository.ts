import { IRepo } from './../base/IBaseRepository';
import { OnlineAuction } from '../../schema/onlineAuction';

export interface IOnlineAuctionRepository  extends IRepo<OnlineAuction> {

    findById(id: string): Promise<OnlineAuction>

    filterOnlineAuction(filter: any): Promise<OnlineAuction>

    getAll(): Promise<Array<OnlineAuction>>

    updateOnlineAuction(anlineAuction_id: string, onlineAuction_params: OnlineAuction): Promise<OnlineAuction>

    deleteOnlineAuction(id: String): Promise<boolean>
}