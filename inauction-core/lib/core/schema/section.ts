import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert, OneToMany
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { Questionnaire } from "./questionnaire";
import { Question } from './question';

@Entity("Section")
export class Section extends BaseEntity {
    @Column()
    title: string;
    @Column()
    description: string;

    @Column()
    weighting: Number;

    @ManyToOne(() => Event, event => event.id) 
    event: Event;

    @ManyToOne(() => Questionnaire, questionnaire => questionnaire.id) 
    questionnaire: Questionnaire;

    @OneToMany(() => Question, (q) => q.section)
    questions: Question[];
}

export enum LotType {
    SIMPLE_LOT,
    ADVANCED_LOT
}

