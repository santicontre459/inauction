import { EventParticipant, InvitationMethod, InvitationStatus } from '../../schema/eventParticipant';

export interface IBidder {
    id?: String;
    userid?: string;
    // companyid?: string;
    email?: string;
    invitation_method: InvitationMethod;
    invitation_status: InvitationStatus;
}