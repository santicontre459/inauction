import { InviteBidderResponseStatus, InviteBidderType } from '../../schema/inviteBidder';
import { User } from "../../schema/user";

export interface IInviteBidder {
    id?: String;
    code?: string;
    inviter: User;
    company_name: string;
    company_registration_number: string;
    email: string;
    type?: InviteBidderType;
    responded_date?: Date;
    responded_status?: InviteBidderResponseStatus;
}
