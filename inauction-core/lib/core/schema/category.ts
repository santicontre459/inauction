import { Guid } from "guid-typescript";
import {
    Entity, Column, PrimaryColumn, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("Category")
export class Category extends BaseEntity {
    
    @Column()
    name: string;
    @Column()
    code: string;
    @Column()
    status: CategoryStatus;
}
export enum CategoryStatus {
    INACTIVE, 
    ACTIVE
}