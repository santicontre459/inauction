import { IRepo } from '../base/IBaseRepository';
import { InviteBidder } from '../../schema/inviteBidder';

export interface IInviteBidderRepository  extends IRepo<InviteBidder> {

    findByCode(code: string): Promise<InviteBidder>
    getAll(query: any): Promise<Array<InviteBidder>>
    checkIfUserInvited(email: string) : Promise<InviteBidder>
}