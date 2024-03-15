import { IRepo } from '../base/IBaseRepository';
import { EventParticipant } from '../../schema/eventParticipant';

export interface IEventParticipantRepository  extends IRepo<EventParticipant> {

    findById(id: string): Promise<EventParticipant>

    filterEventParticipant(filter: any): Promise<EventParticipant>

    getAll(): Promise<Array<EventParticipant>>

    updateEventParticipant(eventParticipant_id: string, eventParticipant_params: EventParticipant): Promise<EventParticipant>

    deleteEventParticipant(id: String): Promise<boolean>
}