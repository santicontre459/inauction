import { IRepo } from './../base/IBaseRepository';
import { LotDetail } from '../../schema/lotDetails';

export interface ILotDetailRepository  extends IRepo<LotDetail> {

    findById(id: string): Promise<LotDetail>

    filterLotDetail(filter: any): Promise<LotDetail>

    getAll(): Promise<Array<LotDetail>>

    updateLotDetail(lotDetail_id: string, lotDetail_params: LotDetail): Promise<LotDetail>

    deleteLotDetail(id: String): Promise<boolean>
}