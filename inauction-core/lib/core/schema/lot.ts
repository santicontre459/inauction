import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";

@Entity("Lot")
export class Lot extends BaseEntity {

    @Column()
    title: string;

    @ManyToOne(() => Event, event => event.id) 
    event: Event;

    @Column({ nullable: true })
    total_current_value: Number;
   
    @Column({ nullable: true })
    total_current_qualification_value: Number;
}



