import { IUserModel } from '../../models/user/IUser';
import { Request } from 'express';
import {
    User,
    UserRegistrationMethod,
    UserRegistrationType,
    UserStatus
} from '../../schema/user';
import { Role } from "../../schema/role";
import {getRepository} from "typeorm";
import {AuthorizationCheck} from "../../../middlewares/authorizationCheck";

export class UserControllerHandler {

    public static async checkUserCreationModel(req: Request): Promise<IUserModel | false> {

        const roleRepository = getRepository(Role);


        if (req.body.first_name
            && req.body.last_name
            && req.body.email
            && req.body.password
            && req.body.phone
            && req.body.position
            && req.body.role_id
            && req.body.subrole_id
        ) {

            // Host
            let HostRole = roleRepository.findOne(req.body.role_id);

            // Admin
            let HostSubRole = roleRepository.findOne(req.body.subrole_id);

            const user: IUserModel = {
                roleId: await HostRole,
                subroleId: await HostSubRole,
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                status: UserStatus.ACTIVE,
                email_verified: true,
                verification_status: 'VERIFIED',
                phoneNumber: req.body.phone,
                registrationMethod: UserRegistrationMethod.SUPERADMIN,
                registrationType: UserRegistrationType.BY_SUPERADMIN,
                firstLogin: null,
                lastLogin: null,
                companyId: null,
                position: req.body.position

            };
            return user;
        } else
            return false;
    }
   

    public static replaceUndescoreWithSpace(item:string) :string{
        return item.split("_").join(" ")
    }

    public static checkUserRoleParameters(roleId: number): string {
        // create filter query
        var roleId =  roleId; //get roleId
        let query: any;
        query = { role: roleId };
        return query;

    }

    /**
     * Check fields required for Bidder Registration first step
     * @param req
     */
    public static async checkBidderCreationModel(req: Request): Promise<IUserModel | false> {

        const roleRepository = getRepository(Role);

        // Bidder
        let BidderRole = roleRepository.findOne(3);

        // Admin
        let BidderSubRole = roleRepository.findOne(9);

        if (req.body.first_name
            && req.body.last_name
            && req.body.email
            && req.body.password
            && req.body.phone
        ) {

            const user: IUserModel = {
                roleId: await BidderRole,
                subroleId: await BidderSubRole,
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                status: UserStatus.ACTIVE,
                email_verified: false,
                verification_status: null,
                phoneNumber: req.body.phone,
                registrationMethod: UserRegistrationMethod.WEB_CONSOLE,
                registrationType: UserRegistrationType.SELF_REGISTRATION,
                firstLogin: null,
                lastLogin: null,
                companyId: null,
                position: null

            };
            return user;
        } else
            return false;
    }


    /**
     * Check fields required for Change Password
     * @param req
     */
    public static async checkChangePasswordHandler(req: Request): Promise<Boolean | false> {

        return !!(req.body.new_password
            && req.body.old_password
            && req.body.user_id);
    }

    public static async checkExpertCreationModel(req: Request): Promise<IUserModel | false> {

        const roleRepository = getRepository(Role);
        const userRepository = getRepository(User);

        // get request user id in order to determine the role and subrole of expert
        const requestUser = AuthorizationCheck.getCurrentUser(req);
        let userRole = (
            await userRepository.findOne(
                requestUser, {relations: ['role', 'subrole', 'company']}
            )
        ).role.id;

        // Host or Bidder
        let role = roleRepository.findOne(userRole);

        // Host Expert or bidder expert
        let subRole = roleRepository.findOne(userRole === 2 ? 8 : 10);

        if (req.body.first_name
            && req.body.last_name
            && req.body.email
            && req.body.password
            && req.body.phone
            && req.body.position
            && req.body.expert_position
        ) {

            const user: IUserModel = {
                roleId: await role,
                subroleId: await subRole,
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                status: UserStatus.ACTIVE,
                email_verified: true,
                verification_status: 'VERIFIED',
                phoneNumber: req.body.phone,
                registrationMethod: UserRegistrationMethod.WEB_CONSOLE,
                registrationType: UserRegistrationType.BY_CUSTOMER,
                firstLogin: null,
                lastLogin: null,
                companyId: null,
                position: req.body.position

            };
            return user;
        } else
            return false;
    }
}