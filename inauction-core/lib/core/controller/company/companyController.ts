import { Address } from './../../schema/address';
import { ICompanyRepository } from '../../repository/company/ICompanyRepository';
import CompanyRepository from '../../repository/company/CompanyRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { Company } from '../../schema/company';
import { BusinessOperation } from "../../schema/businessOperation";
import { getRepository } from "typeorm";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import UserRepository from "../../repository/user/userRepository";
import { User } from "../../schema/user";
import { Expert } from "../../schema/expert";
import AddressRepository from '../../../core/repository/address/addressRepository';
import { AddressStatus } from '../../schema/address';


export class CompanyController {

    /**
     * Get Company Details
     */
    public static async get_company(req: Request, res: Response) {

        let companyRepository: ICompanyRepository = new CompanyRepository(Company);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);

        let companyId = null;

        // get request user id in order to determine if company is of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        const user = await userRepository.findById(requestUser);

        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({
                where : {
                    user: requestUser
                },  relations: ['customer']}, );
            const expertUser = await userRepository.findById(expert.customer.id);
            companyId = expertUser.company ? expertUser.company.id : companyId;
        } else { companyId = user.company ? user.company.id : companyId; }

        // check if company matches
        if (req.params.id && req.params.id === companyId) {
            const company_filter = { id: req.params.id };
            
            await companyRepository.filterCompany(company_filter).then(data => {
                if(data){ res.send(data); }
                else{ failureResponse(ResponseMessages.companyDoesNotExist, null, res); }
            }).catch(err => {
                errorResponse(err, res);
            });

        } else { insufficientParameters(res); }
    }

    /**
     * Update Company
     */
    public static async update_company(req: Request, res: Response) {

        let companyRepository: ICompanyRepository = new CompanyRepository(Company);
        let businessOperationRepository  = getRepository(BusinessOperation);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);
        const addressRepository = new AddressRepository(Address);

        let companyId = null;

        // get request user id in order to determine if company is of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        let user = await userRepository.findById(requestUser);

        // todo: add Address (create || update))
        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({
                where : {
                    user: requestUser
                },  relations: ['customer']}, );

            const expertUser = await userRepository.findById(expert.customer.id);
            companyId = expertUser.company ? expertUser.company.id : companyId;
        } else { companyId = user.company ? user.company.id : companyId; }

        if(req.params.id &&
            req.body.phone_number &&
            req.body.establishment_date &&
            req.body.legal_representative_name &&
            req.body.legal_representative_surname && 
            req.body.business_operation && 
            req.body.representative_position
        ) {

            user.position = req.body.representative_position;
            user = await userRepository.updateUser(requestUser, user);

            let businessOperation = new BusinessOperation();

            await businessOperationRepository.findOne({ where: {id: req.body.business_operation }})
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

            let company = await companyRepository.findById(req.params.id);

            // check if company is of the requestUser
            if (company && company.id === companyId) {  
                company.description = req.body.description ? req.body.description : null;;
                company.establishmentDate = req.body.establishment_date;
                company.phoneNumber = req.body.phone_number;
                company.legalRepresentativeName = req.body.legal_representative_name;
                company.legalRepresentativeSurname = req.body.legal_representative_surname;
                company.businessOperation = businessOperation;
                company.websiteUrl = req.body.website ? req.body.website : null;
                company.modifiedAt = new Date(Date.now());
                company.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const companyResponse = await companyRepository.updateCompany(req.params.id, company);

                user.company = companyResponse;
                res.send({
                    message: "Company has been updated successfully!",
                    data: companyResponse,
                    user : user
                });
            }else{
                failureResponse(ResponseMessages.companyDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Update Address
     */
     public static async update_address(req: Request, res: Response) {

        let companyRepository: ICompanyRepository = new CompanyRepository(Company);
        let userRepository  = new UserRepository(User);
        const expertRepository = getRepository(Expert);
        const addressRepository = new AddressRepository(Address);

        let companyId = null;

        // get request user id in order to determine if company is of the request user
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        let user = await userRepository.findById(requestUser);

        // todo: add Address (create || update))
        // check if the request user is expert
        if (user.subrole.roleName === 'Expert') {
            let expert = await expertRepository.findOne({
                where : {
                    user: requestUser
                },  relations: ['customer']}, );

            const expertUser = await userRepository.findById(expert.customer.id);
            companyId = expertUser.company ? expertUser.company.id : companyId;
        } else { companyId = user.company ? user.company.id : companyId; }

        if(
            req.body.country &&
            req.body.state &&
            req.body.city &&
            req.body.street &&
            req.body.postalCode && 
            req.body.latitude &&  
            req.body.longitude
        ) { 
            let company = await companyRepository.findById(companyId);

            // check if company is of the requestUser
            if (company) {  
                let addressData = new Address();

                if (company.address) {
                    addressData = company.address
                }
    
                addressData.country = req.body.country;
                addressData.state = req.body.state;
                addressData.city = req.body.city;
                addressData.address = req.body.street;
                addressData.addressDetail = req.body.formatted_address;
                addressData.postalCode = req.body.postalCode;
                addressData.latitude = req.body.latitude;
                addressData.longitude = req.body.longitude;

                if (company.address) {
                    addressData.modifiedAt = new Date(Date.now());
                    const response = await addressRepository.updateAddress(company.address.id, addressData);
                    if (response) {
                        company.address = response;
                    }
                }
                else {
                    addressData.status = AddressStatus.ACTIVE;
                    addressData.createdAt = new Date(Date.now());
                    addressData.modifiedAt = new Date(Date.now());
                    const response = await  addressRepository.create(addressData);
                    if (response) {
                        company.address = response;
                    }
                }

                const companyResponse = await companyRepository.updateCompany(companyId, company);

                user.company = companyResponse;
                res.send({
                    message: "Address has been updated successfully!",
                    data: companyResponse,
                    user : user
                });
            }else{
                failureResponse(ResponseMessages.companyDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}