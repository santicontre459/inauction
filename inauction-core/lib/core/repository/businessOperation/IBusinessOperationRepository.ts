import { IRepo } from '../base/IBaseRepository';
import { BusinessOperation } from '../../schema/businessOperation';

export interface IBusinessOperationRepository  extends IRepo<BusinessOperation> {

    findById(id: string): Promise<BusinessOperation>

    filterBusinessOperation(filter: any): Promise<BusinessOperation>

    getAll(): Promise<Array<BusinessOperation>>

    getActive(): Promise<Array<BusinessOperation>>

    updateBusinessOperation(businessOperation_id:string, businessOperation_params: BusinessOperation): Promise<BusinessOperation>

    deleteBusinessOperation(id: String): Promise<boolean>

    getDeleted(): Promise<Array<BusinessOperation>>
}