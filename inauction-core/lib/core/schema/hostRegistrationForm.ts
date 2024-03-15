import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { BusinessOperation } from './businessOperation';
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("HostRegistrationForm")
export class HostRegistrationForm extends BaseEntity {
 
    @Column()
    entityName: string;

    @Column()
    entityEmail: string;

    @Column()
    entityPhoneNumber:string;

    @Column()
    entityLegalRepresentativeFullName:string;

    @ManyToOne(() => BusinessOperation, businessOperation => businessOperation.id)
    entityBusinessOperation: BusinessOperation;

    @Column()
    entityAverageYearlyTurnover:string;

    @Column()
    // Entity Business Registration Number
    entityBusinessRegNumber: string;

}