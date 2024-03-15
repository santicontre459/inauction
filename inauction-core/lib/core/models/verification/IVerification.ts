import { User } from '../../schema/user';

export interface IVerification {
    id?: String;
    user: User;
    expiration: Number;
    token: string;
}