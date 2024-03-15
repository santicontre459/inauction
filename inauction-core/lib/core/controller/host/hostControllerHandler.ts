import { IAddressRepository } from './../../repository/address/IAddressRepository';
import { IUserModel } from '../../models/user/IUser';
import { Request } from 'express';
import {
    UserRegistrationMethod,
    UserRegistrationType,
    UserStatus
} from '../../schema/user';
import { Role } from "../../schema/role";
import {getRepository} from "typeorm";
import {ICompany} from "../../models/company/ICompany";
import {VerificationStatus} from "../../schema/company";
import { Address, AddressStatus } from '../../schema/address';
import AddressRepository from '../../repository/address/addressRepository';

export class HostControllerHandler {

    public static checkHostRoleSubroleParameters(roleId: number, subRoleId: number): string {
        // check if it primary role or subrole
        var subroleId = subRoleId;
        var roleId =  roleId; //get roleId
        let query: any;
        query = { role: roleId , subrole:subroleId};
        return query;

    }

    /**
     * Check fields required for Host Creation
     * @param req
     */
    public static async checkHostCreationModel(req: Request): Promise<IUserModel | false> {

        const roleRepository = getRepository(Role);

        // Host
        let HostRole = roleRepository.findOne(2);

        // Admin
        let HostSubRole = roleRepository.findOne(7);

        if (req.body.first_name
            && req.body.last_name
            && req.body.email
            && req.body.password
            && req.body.phone
            && req.body.position
        ) {

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

    /**
     * Check fields required for Company Creation
     * @param req
     */
    public static async checkCompanyCreationModel(req: Request) : Promise<ICompany | false> {
        let addressRepository: IAddressRepository = new AddressRepository(Address);

        if( req.body.company_name
            && req.body.business_registration_number
            && req.body.legal_representative_name
            && req.body.legal_representative_surname
            && req.body.business_operation_id
            && req.body.company_phone_number
            && req.body.establishment_date
        ){
            // const address = new Address();
            // address.country = '';
            // address.state = '';
            // address.city = '';
            // address.address = '';
            // address.addressDetail = '';
            // address.latitude = '';
            // address.longitude = '';
            // address.postalCode = '';
            // address.status = AddressStatus.ACTIVE;

            // const createdAddress = await addressRepository.create(address);

            const company : ICompany = {
                name: req.body.company_name,
                description: req.body.description ? req.body.description : null,
                businessRegNumber: req.body.business_registration_number,
                address: null,
                establishmentDate: req.body.establishment_date,
                phoneNumber: req.body.company_phone_number,
                legalRepresentativeName: req.body.legal_representative_name,
                legalRepresentativeSurname: req.body.legal_representative_surname,
                businessOperationId: req.body.business_operation_id,
                websiteUrl: req.body.website ? req.body.website : null,
                verificationStatus: VerificationStatus.VERIFIED,
            };
            return company;
        } else
            return false;
    }
}