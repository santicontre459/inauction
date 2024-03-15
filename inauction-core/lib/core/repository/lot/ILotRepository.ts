import { IRepo } from './../base/IBaseRepository';
import { Lot } from '../../schema/lot';

export interface ILotRepository  extends IRepo<Lot> {

    findById(id: string): Promise<Lot>

    filterLot(filter: any): Promise<Lot>

    getAll(): Promise<Array<Lot>>

    updateLot(lot_id: string, lot_params: Lot): Promise<Lot>

    deleteLot(id: String): Promise<boolean>
}