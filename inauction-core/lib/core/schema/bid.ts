import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { Lot } from "./lot";
import { User } from "./user";

@Entity("Bid")
export class Bid extends BaseEntity {

    @Column()
    value: Number;

    @ManyToOne(() => Event, event => event.id) 
    event: Event;
    
    @ManyToOne(() => Lot, lot => lot.id) 
    lot: Lot;

    @ManyToOne(() => User, user => user.id) 
    host: User;
    
    @ManyToOne(() => User, user => user.id) 
    bidder: User;
}
