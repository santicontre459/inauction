import {Entity, Column } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("EventCategory")
export class EventCategory extends BaseEntity{
   
    @Column()
    name: String;

    @Column()
    description: String;

    @Column()
    status: EventCategoryStatus;
}

export enum EventCategoryStatus {
    INACTIVE,
    ACTIVE
}
