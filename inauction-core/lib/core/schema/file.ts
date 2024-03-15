import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { Company } from './company';
import { Event } from './event';
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("File")
export class File extends BaseEntity {
 
    @Column()
    name: Name;

    @Column({nullable:true})
    fileName: string;

    @Column()
    type: Type;

    @Column({nullable:true})
    path: string;

    @ManyToOne(() => Company, company => company.id)
    company: Company;

    @ManyToOne(() => Event, event => event.id,{ nullable: true })
    event: Event;

    @Column({ nullable: true })
    uploadedBy: String;

    @Column()
    inauctionType: InauctionType;

}

export enum InauctionType {
    BIDDER_REGISTRATION = 0,
    EVENT_CREATE = 1,
    EVENT_RESPOND = 2,
}

export enum Type {
    PDF = 0,
    IMAGE = 1,
    WORD = 2,
    EXCEL = 3,
    OTHER = 4,
}

export enum Name {
    BUSINESS_CERTIFICATE = 0,
    ID_PASSPORT = 1,
    OTHER = 2,
}