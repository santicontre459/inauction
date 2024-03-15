import { IRepo } from '../base/IBaseRepository';
import { LegalForm } from '../../schema/legalForm';

export interface ILegalFormRepository  extends IRepo<LegalForm> {

    findById(id: string): Promise<LegalForm>

    filterLegalForm(filter: any): Promise<LegalForm>

    getAll(): Promise<Array<LegalForm>>

    getActive(): Promise<Array<LegalForm>>

    updateLegalForm(legalForm_id:string, legalForm_params: LegalForm): Promise<LegalForm>

    deleteLegalForm(id: String): Promise<boolean>

    getDeleted(): Promise<Array<LegalForm>>
}