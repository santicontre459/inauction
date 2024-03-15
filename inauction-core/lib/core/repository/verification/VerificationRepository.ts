import { getRepository } from "typeorm";
import { Verification } from "../../schema/verification";
import { BaseRepository } from '../base/BaseRepository';
import { IVerificationRepository } from './IVerificationRepository';

export default class VerificationRepository extends BaseRepository<Verification> implements IVerificationRepository {

    // find by verification token
    public async findByToken(token: string): Promise<Verification> {
        const verificationRepository = getRepository(Verification);
        return await verificationRepository.findOne({ where: { isDeleted: false, token: token } });
    }

    // find by user id
    public async findByUserId(userId: string): Promise<Verification> {
        const verificationRepository = getRepository(Verification);
        return await verificationRepository.findOne({ where: { isDeleted: false, user: userId } });
    }
}