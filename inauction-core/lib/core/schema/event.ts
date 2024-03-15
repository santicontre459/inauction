import {
    Entity,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Currency } from './currency';
import { User } from './user';
import { EventCategory } from './eventCategory';
import { BaseEntity } from "./common/audit/baseEntity";
import { Activity } from "./activity";
import { OnlineAuction } from './onlineAuction';
import { Rfq } from './rfq';
import { Questionnaire } from './questionnaire';
import { File } from "./file";

export enum EventVisibility {
    ACCESSIBLE_TO_ALL,
    ACCESSIBLE_BY_INVITATION
}

@Entity("Event")
export class Event extends BaseEntity {
    
    @Column()
    title: string;

    @Column()
    referenceNumber: string;

    @Column()
    description: string;

    @Column()
    defineBudget: boolean;

    @Column( { nullable: true })
    totalBudget: Number;

    @Column()
    expertsNumber: Number;

    @ManyToOne(() => Currency, currency => currency.id)
    currency: Currency;
    
    @Column()
    hasQuestionnaire: Boolean;

    @Column()
    eventType: EventType;

    @Column({ nullable: true })
    lotType: LotType;

    @Column()
    progressStatus: EventProgressStatus;
  
    @ManyToOne(() => User, host => host.id)
    host: User;

    @ManyToOne(() => EventCategory, eventCategory => eventCategory.id)
    eventCategory: EventCategory;

    @ManyToOne(() => Activity, activity => activity.id)
    activity: Activity;

    @Column({ default : EventVisibility.ACCESSIBLE_BY_INVITATION })
    visibility: EventVisibility;

    @Column({ nullable: true })
    accessibleListId: String;

    @Column({ default: false })
    deletedByAdmin: boolean;

    @OneToMany(() => OnlineAuction, (oa) => oa.event)
    onlineAuctions: OnlineAuction[];

    @OneToMany(() => Rfq, (rfq) => rfq.event)
    rfqs: Rfq[];

    @OneToMany(() => Questionnaire, (q) => q.event)
    questionNaires: Questionnaire[];

    @OneToMany(() => File, (q) => q.event)
    files: File[];
}

export enum EventType {
    RFQ, 
    OA,
    NONE
}
export enum EventProgressStatus {
    DRAFT,
    WAITING_REVIEW,
    READY_TO_PUBLISH,
    PUBLISHED,
    OPEN ,
    COMPLETED,
    AWARDED,
    CANCELLED,
    DELETED
}

export enum LotType {
    SIMPLE_LOT,
    ADVANCED_LOT
}