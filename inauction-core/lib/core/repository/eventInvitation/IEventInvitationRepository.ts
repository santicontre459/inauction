import { IRepo } from '../base/IBaseRepository';
import { EventInvitation } from '../../schema/eventInvitation';

export interface IEventInvitationRepository  extends IRepo<EventInvitation> {

    findById(id: string): Promise<EventInvitation>

    filterEventInvitation(filter: any): Promise<EventInvitation>

    getAll(): Promise<Array<EventInvitation>>

    updateEventInvitation(eventInvitation_id: string, eventInvitation_params: EventInvitation): Promise<EventInvitation>

    deleteEventInvitation(id: String): Promise<boolean>
}