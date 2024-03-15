import { IAddressRepository } from './../../repository/address/IAddressRepository';
import { ICompany } from "core/models/company/ICompany";
import AddressRepository from '../../repository/address/addressRepository';
import { Address, AddressStatus } from '../../schema/address';
import { Request } from 'express';
import { VerificationStatus } from '../../schema/company';

export class CompanyControllerHandler {

    public static async checkCompanyCreationModel(req: Request) : Promise<ICompany | false> {
        let addressRepository: IAddressRepository= new AddressRepository(Address);
        if( req.body.name
            && req.body.business_registration_number
            && req.body.legal_representative_name
            && req.body.legal_representative_surname
            && req.body.business_operation_id
            && req.body.position
            && req.body.user_id
        ){
            const address = new Address();
            address.country = '';
            address.state = '';
            address.city = '';
            address.address = '';
            address.addressDetail = '';
            address.latitude = '';
            address.longitude = '';
            address.postalCode = '';
            address.status = AddressStatus.ACTIVE;
            address.createdAt = new Date(Date.now());
            address.modifiedAt = new Date(Date.now());

            const createdAddress = await addressRepository.create(address);

            const company : ICompany = {
                name: req.body.name,
                description: null,
                businessRegNumber: req.body.business_registration_number,
                address: createdAddress,
                establishmentDate: null,
                phoneNumber: null,
                legalRepresentativeName: req.body.legal_representative_name,
                legalRepresentativeSurname: req.body.legal_representative_surname,
                businessOperationId: req.body.business_operation_id,
                websiteUrl: null,
                verificationStatus: VerificationStatus.IN_VERIFICATION_PROCESS,
            };
            return company;
        } else 
        return false;
    }
}