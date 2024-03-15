import { UserRegistrationTypeEnum } from '../common/enums/UserRegistrationTypesEnum';
import { ResponseMessages } from '../common/resource/Resource';
import { IPosition } from '../../models/user/IPosition';
import { UserControllerHandler } from './userControllerHandler';
import { IUserRepository } from '../../repository/user/IUserRepository';
import { PasswordEncryption } from '../common/passwordEncryption/encryption';
import {
    insufficientParameters,
    errorResponse,
    failureResponse
} from '../common/handler/responseHandler';
import UserRepository from '../../repository/user/userRepository';
import { User } from '../../schema/user';
import { Request, Response } from 'express';
import { UserPositionEnum } from '../common/enums/UserPositionsEnum';
import {Role, SystemRoles} from '../../schema/role';
import { UserRegistrationMethodEnum } from '../common/enums/UserRegistrationMethodsEnum';

export class UserController {

    // user creation
    public static async create_user(req: Request, res: Response) {
        let userRepository: IUserRepository = new UserRepository(User);

        const handler = await UserControllerHandler.checkUserCreationModel(req);

        if (handler) {

            let role = new Role();
            let subRole = new Role();

            // check if role exists
            if (handler.roleId) {
                role = handler.roleId;
            } else {
                failureResponse(ResponseMessages.roleDoesNotExist, null, res);
            }

            // check if sub role exists
            if (handler.subroleId) {
                subRole = handler.subroleId;
            } else {
                failureResponse(ResponseMessages.subRoleDoesNotExist, null, res);
            }

            // check if an user is already registered with given email
            if (await userRepository.checkIfUserExist(handler.email)) {
                failureResponse(ResponseMessages.userAlreadyExist, null, res);
                return false;
            }

            // user create
            let userEntity: User = new User();
            userEntity.firstName = handler.firstName;
            userEntity.lastName = handler.lastName;
            userEntity.password = PasswordEncryption.hashPassword(req.body.password);
            userEntity.role = role;
            userEntity.subrole = subRole;
            userEntity.email = handler.email;
            userEntity.status = handler.status;
            userEntity.email_verified = handler.email_verified;
            userEntity.verification_status = handler.verification_status;
            userEntity.phoneNumber = handler.phoneNumber;
            userEntity.registrationMethod = handler.registrationMethod;
            userEntity.registrationType = handler.registrationType;
            userEntity.firstLogin = null;
            userEntity.lastLogin = null;
            userEntity.company = null;
            userEntity.position = handler.position;
            userEntity.createdAt = new Date(Date.now());
            userEntity.modifiedAt = new Date(Date.now());

            const userResponse = await userRepository.create(userEntity);

            res.status(200).send({
                message: "Superadmin user has been created successfully!",
                data: userResponse
            });

        } else {
            insufficientParameters(res);
        }
    }


    // get list of users
    public static async get_users(req: Request, res: Response) {

        let query = UserControllerHandler.checkUserRoleParameters(SystemRoles.Superadmin);
        let queryAudit = UserControllerHandler.checkUserRoleParameters(SystemRoles.Audit);

        let userRepository: UserRepository = new UserRepository(User);
        const users = await userRepository.getAll(query);
        const usersAudit = await userRepository.getAll(queryAudit);
        let finalUsers = users.concat(usersAudit);

        if (finalUsers.length > 0)
            res.status(200).send({ data: finalUsers });
        else
            res.status(200).send({ data: [] });

    }

    // return list of positions
    public static async getPositions(req: Request, res: Response) {
        try {
            const positions: Array<IPosition> = [];

            for (const [propertyKey, propertyValue] of Object.entries(UserPositionEnum)) {
                if (!Number.isNaN(Number(propertyKey))) {
                    continue;
                }
                positions.push({ id: Number(propertyValue), name: UserControllerHandler.replaceUndescoreWithSpace(propertyKey) });
            }

            res.send(positions)
        }
        catch (err) {
            errorResponse(err, res);
        }

    }

    // Retrieve Registration Methods needed for User Creation
    public static async getRegistrationMethods(req: Request, res: Response) {
        try {
            const registrationMethods: Array<IPosition> = [];

            for (const [propertyKey, propertyValue] of Object.entries(UserRegistrationMethodEnum)) {
                if (!Number.isNaN(Number(propertyKey))) {
                    continue;
                }
                registrationMethods.push({ id: Number(propertyValue), name: UserControllerHandler.replaceUndescoreWithSpace(propertyKey) });
            }

            res.send(registrationMethods)
        }
        catch (err) {
            errorResponse(err, res);
        }

    }

    // Retrieve Registration Types needed for User Creation
    public static async getRegistrationTypes(req: Request, res: Response) {
        try {
            const registrationTypes: Array<IPosition> = [];

            for (const [propertyKey, propertyValue] of Object.entries(UserRegistrationTypeEnum)) {
                if (!Number.isNaN(Number(propertyKey))) {
                    continue;
                }
                registrationTypes.push({ id: Number(propertyValue), name: UserControllerHandler.replaceUndescoreWithSpace(propertyKey) });
            }

            res.send(registrationTypes)
        }
        catch (err) {
            errorResponse(err, res);
        }

    }
}