import {Entity, Column } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("Currency")
export class Currency extends BaseEntity{

    @Column()
    title: String;

    @Column()
    slug: String;

    @Column()
    status: CurrencyStatus;
}

export enum CurrencyStatus {
    INACTIVE,
    ACTIVE
}