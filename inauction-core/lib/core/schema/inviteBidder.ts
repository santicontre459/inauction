import {Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { BaseEntity } from "./common/audit/baseEntity";
import { Company } from './company';
import { User } from './user';

@Entity("InviteBidder")
export class InviteBidder extends BaseEntity{

    @Column()
    code: string;

    @ManyToOne(type => User, inviter => inviter.id)
    inviter: User;
    
    @Column()
    company_name: String;

    @Column()
    company_registration_number: String;
      
    @Column()
    email: String;

    @Column()
    type: InviteBidderType;

    @Column({ nullable: true })
    responded_date: Date;

    @Column()
    responded_status: InviteBidderResponseStatus;

}
export enum InviteBidderResponseStatus {
    NOT_RESPONDED,
    ACCEPTED
}

export enum InviteBidderType {
    IMMEDIATELY
}