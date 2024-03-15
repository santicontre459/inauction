import { UserStatus, UserRegistrationMethod, UserRegistrationType, UserPosition } from '../../core/schema/user';
import { UserController } from '../../core/controller/user/userController';
import { expect } from 'chai';

describe('UserController', () => {
    let controller;
    beforeEach(() => {
        controller = new UserController();
    });

    it('should get back all user', () => {
        expect(controller.getUsers()).to.deep.equal(
            [{

                id: "af48e8f7-e44f-4d60-b54c-cb8aba4bff0f",
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                status: UserStatus.ACTIVE,
                verified: true,
                phoneNumber: "+3556911111111",
                registrationMethod: UserRegistrationMethod.SUPERADMIN,
                registrationType: UserRegistrationType.INITIAL_DB_SEEDER,
                firstLogin: new Date(),
                lastLogin: new Date(),
                position: UserPosition.Chief_Executive_Officer,
                createdAt: new Date(),
                modifiedAt: new Date(),
                modifiedBy: "5fc8716f-97db-438b-88fa-7c64402ca209"
            },
            {
                id: "af48e8f7-e44f-4d60-b54c-cb8aba4bff0f",
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                status: UserStatus.ACTIVE,
                verified: true,
                phoneNumber: "+3556911111111",
                registrationMethod: UserRegistrationMethod.SUPERADMIN,
                registrationType: UserRegistrationType.INITIAL_DB_SEEDER,
                firstLogin: new Date(),
                lastLogin: new Date(),
                position: UserPosition.Chief_Executive_Officer,
                createdAt: new Date(),
                modifiedAt: new Date(),
                modifiedBy: "5fc8716f-97db-438b-88fa-7c64402ca209"
            }]
        );
    });

});