import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { BusinessOperation } from './businessOperation';
import { Address } from './address';
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("Company")
export class Company extends BaseEntity {
 
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    // Business Registration Number
    businessRegNumber: string;

    @ManyToOne(() => Address, address => address.id, { nullable: true })
    address: Address;

    @Column({ nullable: true })
    establishmentDate:string;

    @Column({ nullable: true })
    phoneNumber:string;

    @Column()
    legalRepresentativeName:string;

    @Column()
    legalRepresentativeSurname:string;

    @ManyToOne(() => BusinessOperation, businessOperation => businessOperation.id)
    businessOperation: BusinessOperation;

    @Column({ nullable: true })
    websiteUrl: string;
  
    @Column()
    verificationStatus: VerificationStatus;
}


export enum  VerificationStatus {
    IN_VERIFICATION_PROCESS,
    VERIFIED,
    VERIFICATION_BLOCKED,
    MORE_INFO_REQUIRED,
}