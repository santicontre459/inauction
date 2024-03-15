import { IRepo } from './../base/IBaseRepository';
import { Event, EventProgressStatus } from '../../schema/event';

export interface IEventRepository  extends IRepo<Event> {

    findById(id: string): Promise<Event>

    filterEvent(filter: any): Promise<Event>

    getAll(): Promise<Array<Event>>

    getEventsByStatus(status : EventProgressStatus) : Promise<Array<Event>>

    updateEvent(event_id: string, event_params: Event): Promise<Event>

    deleteEvent(id: String): Promise<boolean>
}