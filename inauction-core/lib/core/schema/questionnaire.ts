import {
    Entity,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { Section } from './section';

@Entity("Questionnaire")
export class Questionnaire extends BaseEntity {

    @Column()
    title: string;

    @Column( { nullable: true })
    description: string;

    @Column()
    deadline: Date;
   
    @Column()
    hasScoring: boolean;

    @Column()
    hasWeighting: boolean;

    @Column({ nullable: true })
    weighting: Number;
     
    @Column()
    isPrequalification: boolean;
    
    @Column()
    inEventResultCalculation: boolean;

    @ManyToOne(() => Event, event => event.id) 
    event: Event;

    @Column()
    weightingType: WeightingType;
    
    @OneToMany(() => Section, (s) => s.questionnaire)
    sections: Section[];
}

export enum WeightingType {
    NONE,
    PER_SECTION,
    PER_QUESTION,
    PER_SECTION_AND_QUESTION,
}