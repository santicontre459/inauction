import { Expert } from 'core/schema/expert';
import { IRepo } from '../base/IBaseRepository';

export interface IExpertRepository extends IRepo<Expert> {
    filter(filter: any): Promise<Expert>
    findById(id: string): Promise<Expert>
    getAll(query: any): Promise<Array<Expert>>
    updateExpert(expert_id: string, expert_params: Expert): Promise<Expert>
    checkIfExpertExists(id: string) : Promise<Expert>
}