import { ResponseMessages } from '../common/resource/Resource';
import { ICompanyRepository } from '../../repository/company/ICompanyRepository';
import { HostControllerHandler } from './hostControllerHandler';
import { IUserRepository } from '../../repository/user/IUserRepository';
import { PasswordEncryption } from '../common/passwordEncryption/encryption';
import { insufficientParameters, errorResponse, failureResponse, successResponse } from '../common/handler/responseHandler';
import UserRepository from '../../repository/user/userRepository';
import { User } from '../../schema/user';
import { Request, Response } from 'express';
import { UserPositionEnum } from '../common/enums/UserPositionsEnum';
import {Role, SystemRoles} from '../../schema/role';
import CompanyRepository from '../../repository/company/CompanyRepository';
import { Company } from '../../schema/company';
import { BusinessOperation } from "../../schema/businessOperation";
import { getRepository } from "typeorm";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

export class HostController {

    // host creation
    public static async create_host(req: Request, res: Response) {

        let hostRepository: IUserRepository = new UserRepository(User);
        let companyRepository: ICompanyRepository = new CompanyRepository(Company);
        let businessOperationRepository  = getRepository(BusinessOperation);
        let hostRepositoryUpdate  = new UserRepository(User);

        const handler = await HostControllerHandler.checkHostCreationModel(req);
        const companyHandler =  await HostControllerHandler.checkCompanyCreationModel(req);

        if (handler && companyHandler) {

            let role = new Role();
            let subRole = new Role();
            let businessOperation = new BusinessOperation();

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
            if (await hostRepository.checkIfUserExist(handler.email)) {
                failureResponse(ResponseMessages.hostAlreadyExist, null, res);
                return false;
            }

            await businessOperationRepository.findOne({ where: {id: req.body.business_operation_id }})
                .then((business_operation_data: BusinessOperation) => {
                    // if business_operation_data inactive or deleted  company should not be created
                    if (business_operation_data.status === 0 || business_operation_data.isDeleted === true) {
                        businessOperation = null;
                    }
                    else {
                        businessOperation = business_operation_data;
                    }
                }).catch(() => { businessOperation = null; });

            // check if business operation exists
            if (!businessOperation) {
                failureResponse(ResponseMessages.businessOperationDoesNotExist, null, res);
                return false;
            }

            // check if company is already registered with a given business registration umber
            if (await companyRepository.checkIfCompanyExist(companyHandler.businessRegNumber)) {
                failureResponse(ResponseMessages.companyAlreadyExist, null, res);
                return false;
            }

            let jobPosition = UserPositionEnum[req.body.position];

            // check if job position exists
            if (!jobPosition) {
                failureResponse(ResponseMessages.jobPositionDoesNotExist, null, res);
                return false;
            }

            // host create
            let hostEntity: User = new User();
            hostEntity.firstName = handler.firstName;
            hostEntity.lastName = handler.lastName;
            hostEntity.password = PasswordEncryption.hashPassword(req.body.password);
            hostEntity.role = role;
            hostEntity.subrole = subRole;
            hostEntity.email = handler.email;
            hostEntity.status = handler.status;
            hostEntity.email_verified = handler.email_verified;
            hostEntity.verification_status = handler.verification_status;
            hostEntity.phoneNumber = handler.phoneNumber;
            hostEntity.registrationMethod = handler.registrationMethod;
            hostEntity.registrationType = handler.registrationType;
            hostEntity.firstLogin = null;
            hostEntity.lastLogin = null;
            hostEntity.company = null;
            hostEntity.position = handler.position;
            hostEntity.createdAt = new Date(Date.now());
            hostEntity.modifiedAt = new Date(Date.now());

            const hostResponse = await hostRepository.create(hostEntity);

            try {

                // company create
                let companyEntity: Company = new Company();
                companyEntity.name = companyHandler.name;
                companyEntity.description = companyHandler.description;
                companyEntity.businessRegNumber = companyHandler.businessRegNumber;
                companyEntity.establishmentDate = companyHandler.establishmentDate;
                companyEntity.phoneNumber = companyHandler.phoneNumber;
                companyEntity.websiteUrl = companyHandler.websiteUrl;
                companyEntity.legalRepresentativeName = companyHandler.legalRepresentativeName;
                companyEntity.legalRepresentativeSurname = companyHandler.legalRepresentativeSurname;
                companyEntity.verificationStatus = companyHandler.verificationStatus;
                companyEntity.businessOperation = businessOperation;
                companyEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);
                companyEntity.createdAt = new Date(Date.now());
                companyEntity.modifiedAt = new Date(Date.now());
                companyEntity.address = companyHandler.address;

                const companyResponse = await companyRepository.create(companyEntity);

                // After creating the company update Host with the needed data
                try {
                    hostResponse.company = companyResponse;

                    hostRepositoryUpdate.updateUser(hostResponse.id, hostResponse)
                        .then(() => {
                            res.status(200).send({
                                message: 'Host with Company has been created successfully!',
                                data: hostResponse
                            });
                        })
                        .catch(() => {
                            res.status(500).send(
                                {
                                    message: 'There was an error creating either host or either company! Check Host Records to verify the issue!'
                                }
                            );
                        })
                }
                catch (err) {
                    errorResponse(err, res);
                }

            } catch (err) {
                errorResponse(err, res);
            }

        } else {
            insufficientParameters(res);
        }
    }

    // get list of hosts
    public static async get_hosts(req: Request, res: Response) {

        let query = HostControllerHandler.checkHostRoleSubroleParameters(SystemRoles.Host, SystemRoles.HostAdmin);

        let userRepository: UserRepository = new UserRepository(User);
        let companyRepository: ICompanyRepository = new CompanyRepository(Company);

        const hosts = await userRepository.getAll(query);

        // assign business operation to company
        for (const host of hosts) {
            let companyWithBusinessOperation = new Company();
            await companyRepository.findById(host.company.id)
                .then((company_data: Company) => {
                    companyWithBusinessOperation = company_data;
                }).catch(() => { companyWithBusinessOperation = host.company; });
            host.company = companyWithBusinessOperation;
        }

        if (hosts.length > 0)
            res.status(200).send({ data: hosts });
        else
            res.status(200).send({ data: [] });

    }

}