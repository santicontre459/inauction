import { Address } from './../../schema/address';
import { VerificationStatus } from "../../schema/company";

export interface ICompany {
    id?: string;
    name: string;
    description: string;
    businessRegNumber: string;
    address: Address;
    establishmentDate: string;
    phoneNumber: string;
    legalRepresentativeName: string;
    legalRepresentativeSurname: string;
    businessOperationId: String;
    websiteUrl: string;
    verificationStatus: VerificationStatus;
}