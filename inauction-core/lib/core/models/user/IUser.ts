import {
    UserStatus,
    UserPosition,
    UserRegistrationMethod,
    UserRegistrationType
} from '../../schema/user';

import { Role } from '../../schema/role';

// do not return this to user
export interface IUserModel {
    roleId: Role;
    subroleId: Role;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: UserStatus;
    email_verified: boolean;
    verification_status: string;
    phoneNumber: string;
    registrationMethod:  UserRegistrationMethod;
    registrationType: UserRegistrationType;
    firstLogin: Date;
    lastLogin: Date;
    companyId: string; 
    position: UserPosition
}

export interface IUser {
    id?: String;
    name:string;
    email: String;
    phone_number: String;
    gender: String;
}