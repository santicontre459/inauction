import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Company } from './company';
import { Activity } from './activity';

@Entity("CompanyActivity")
export class CompanyActivity extends BaseEntity {
    @ManyToOne(() => Company, company => company.id) 
    company: Company;

    @ManyToOne(() => Activity, activity => activity.id) 
    activity: Activity;
}