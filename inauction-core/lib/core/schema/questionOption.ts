import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Event } from "./event";
import { Questionnaire } from "./questionnaire";
import { Section } from "./section";
import { Question } from "./question";

@Entity("QuestionOption")
export class QuestionOption extends BaseEntity {

    @ManyToOne(() => Event, event => event.id) 
    event: Event;

    @ManyToOne(() => Questionnaire, questionnaire => questionnaire.id) 
    questionnaire: Questionnaire;

    @ManyToOne(() => Section, section => section.id, { onDelete: 'CASCADE' }) 
    section: Section;

    @ManyToOne(() => Question, question => question.id, { onDelete: 'CASCADE' }) 
    question: Question;

    @Column()
    option: String;

    @Column()
    score: Number;

    @Column()
    fail: Boolean;

    @Column({ nullable: true })
    max_char: Number;

}
