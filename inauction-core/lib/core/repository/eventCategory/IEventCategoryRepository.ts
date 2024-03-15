import { IRepo } from '../base/IBaseRepository';
import { EventCategory } from '../../schema/eventCategory';

export interface IEventCategoryRepository  extends IRepo<EventCategory> {

    findById(id: string): Promise<EventCategory>

    filterEventCategory(filter: any): Promise<EventCategory>

    getAll(): Promise<Array<EventCategory>>

    getActive(): Promise<Array<EventCategory>>

    updateEventCategory(eventCategory_id:string, eventCategory_params: EventCategory): Promise<EventCategory>

    deleteEventCategory(id: String): Promise<boolean>
}