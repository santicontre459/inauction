import {Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { BaseEntity } from "./common/audit/baseEntity";
import { Company } from './company';
import { User } from './user';

@Entity("LegalForm")
export class LegalForm extends BaseEntity{

    @Column()
    title: String;

    @Column()
    description: String;

    @Column()
    status: LegalFormStatus;
}

export enum LegalFormStatus {
    INACTIVE,
    ACTIVE
}
