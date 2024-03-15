import { IRepo } from './../base/IBaseRepository';
import { Rfq } from '../../schema/rfq';

export interface IRFQRepository  extends IRepo<Rfq> {

    findById(id: string): Promise<Rfq>

    filterRfq(filter: any): Promise<Rfq>

    getAll(): Promise<Array<Rfq>>

    updateRfq(rfq_id: string, rfq_params: Rfq): Promise<Rfq>

    deleteRfq(id: String): Promise<boolean>
}