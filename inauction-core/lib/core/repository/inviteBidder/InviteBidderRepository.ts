import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IInviteBidderRepository } from './IInviteBidderRepository';
import { InviteBidder } from "../../schema/inviteBidder";

@EntityRepository(InviteBidder)
export default class InviteBidderRepository extends BaseRepository<InviteBidder> implements IInviteBidderRepository {

    public async findByCode(code: string): Promise<InviteBidder> {
        const repository = getRepository(InviteBidder);
        return await repository.findOne({ where: { isDeleted: false, code: code } });
    }

    public async getAll(query: any): Promise<Array<InviteBidder>>  {

        const repository = getRepository(InviteBidder);
        if (query) {
            return await repository.find({
                where: query,
                relations: [
                    'inviter',
                ]
            });
        } else {
            return await repository.find({ relations: ['inviter']});
        }
    }

    public async checkIfUserInvited(email: string): Promise<InviteBidder> {
        const repository = getRepository(InviteBidder);
        return await repository.findOne({ where: { isDeleted: false, email: email } });
    }

}
