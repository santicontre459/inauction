import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";

//Uom - Definition for Unit of Measurements
@Entity("Uom")
export class Uom extends BaseEntity {

    @Column()
    status: UomStatus;

    @Column()
    title: string;
    
}

export enum UomStatus {
    INACTIVE,
    ACTIVE,

}
