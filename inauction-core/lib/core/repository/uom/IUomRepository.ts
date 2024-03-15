import { IRepo } from '../base/IBaseRepository';
import { Uom } from '../../schema/uom';

export interface IUomRepository  extends IRepo<Uom> {

    findById(id: String): Promise<Uom>

    filterUom(filter: any): Promise<Uom>

    getAll(): Promise<Array<Uom>>

    getActive(): Promise<Array<Uom>>

    updateUom(uom_id:string, uom_params: Uom): Promise<Uom>

    deleteUom(id: String): Promise<boolean>

    getDeleted(): Promise<Array<Uom>>
}