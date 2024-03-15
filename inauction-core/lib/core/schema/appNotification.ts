import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { User } from "./user";

//Uom - Definition for Unit of Measurements
@Entity("AppNotification")
export class AppNotification extends BaseEntity {
    @Column()
    notification_type: NotificationType;

    @Column({ nullable: true })
    data_id: String;

    @Column({ nullable: true })
    title: String;

    @Column({ nullable: true })
    message: String;

    @ManyToOne(() => User, user => user.id) 
    user: User;

    @Column({ default: false })
    read: boolean;
}

export enum NotificationType{
    NORMAL_NOTIFICATION,
    INVITATION_EVENT
}

