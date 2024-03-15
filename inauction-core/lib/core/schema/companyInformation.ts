import {
    Entity, Column, PrimaryColumn, ManyToOne, BeforeInsert, OneToOne
} from "typeorm";
import { Company } from './company';
import { LegalForm } from './legalForm';
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("CompanyInformation")
export class CompanyInformation extends BaseEntity{
    
    @OneToOne(() => Company, company => company.id)
    company: Company;

    @ManyToOne(() => LegalForm, legalForm => legalForm.id)
    legalForm: LegalForm;

    @Column()
    ownership: string;

    @Column()
    employeeTotal: Number;
    
    @Column()
    annualTurnover: String;
}