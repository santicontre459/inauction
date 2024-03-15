import { IRepo } from '../base/IBaseRepository';
import { Verification } from '../../schema/verification';

export interface IVerificationRepository  extends IRepo<Verification> {

    findByToken(token: string): Promise<Verification>

    findByUserId(userId: string): Promise<Verification>
}