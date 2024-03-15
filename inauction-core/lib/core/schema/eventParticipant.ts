import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { User } from "./user";
import { EventInvitation } from "./eventInvitation";

//Uom - Definition for Unit of Measurements
@Entity("EventParticipant")
export class EventParticipant extends BaseEntity {

    @ManyToOne(() => Event, event => event.id) 
    event: Event;

    @ManyToOne(() => EventInvitation, eventInvitation => eventInvitation.id) 
    eventInvitation: EventInvitation;

    @ManyToOne(() => User, user => user.id, {nullable: true}) 
    participant: User;
    
    // @ManyToOne(() => User, user => user.id) 
    // host: User;

    @Column()
    email: String;

    @Column()
    invitation_method: InvitationMethod;

    @Column()
    invitation_status: InvitationStatus;

    @Column({ nullable: true })
    incoded_participant_username: string;

    @Column({ nullable: true })
    accessible_list_id: string;
  
    @Column({ nullable: true })
    access_method: AccessMethod;
}

export enum InvitationMethod{
    BIDDERS_DATABASE,
    EVENT_CATEGORY,
    EMAIL
}

export enum InvitationStatus{
    PENDING,
    ACCEPTED,
    CANCELLED,
    DECLINED,
    EXPIRED 
}

export enum AccessMethod{
    ACCESSED_THROUGH_INVITATION,
    ACCESSED_THROUGH_LIST
}
