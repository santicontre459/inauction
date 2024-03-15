import { User } from '../../schema/user';

export interface IUserAuthRequest {
    email: string;
    password: string;
    source: string;
}
export interface IUserAuthenticatedResponse {
    token: string;
    data: User;
}
export interface IUserAuthResponse {
    id: string,
    email: string;
    password: string;
}
export interface IUserPasswordChanges {
    iid: string,
    email: string;
    password: string;
}