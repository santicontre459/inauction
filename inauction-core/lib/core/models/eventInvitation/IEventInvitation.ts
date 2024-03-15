import { EventInvitation, NotificationType } from '../../schema/eventInvitation';

export interface IEventInvitationCreateEvent {
    id?: String;
    eventid : String;
    bidders: [];
    emailInvitations: [];
    eventCategories: [];
    notification_type: NotificationType;
}
