import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { User } from "./user";

//Uom - Definition for Unit of Measurements
@Entity("EventInvitation")
export class EventInvitation extends BaseEntity {

    @ManyToOne(() => Event, event => event.id) 
    event: Event;
    
    // @ManyToOne(() => User, user => user.id) 
    // bidder: User;

    @ManyToOne(() => User, user => user.id) 
    inviter: User;

    @ManyToOne(() => User, user => user.id) 
    host: User;
    
    @Column()
    notification_type: NotificationType;
}

export enum NotificationType{
    EMAIL,
    NOTIFICATION,
    NOTIFICATION_EMAIL
}

