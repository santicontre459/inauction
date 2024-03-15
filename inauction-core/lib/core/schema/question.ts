import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert, OneToMany
} from "typeorm";
import { BaseEntity, BidDirection } from "./common/audit/baseEntity";
import { Event } from "./event";
import { Questionnaire } from "./questionnaire";
import { Section } from "./section";
import {File} from "./file";
import {QuestionOption} from "./questionOption";

@Entity("Question")
export class Question extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    // scoring_criteria
    // A scoring criteria to the question. This is not seen by the participant and will be for the Host view only.
    // It can be used to describe how the question should be scored and thus help with consistency when scoring
    // over multiple participants at different times.
    @Column({nullable : true})
    scoring_criteria: string;

    // is_mandatory
    // 1 - mandatory must answer this question before they will be allowed to submit their questionnaire.
    // 0 - not mandatory
    @Column({nullable : true})
    is_mandatory: boolean;

    // scoring
    // add a maximum score for the question
    @Column({nullable : true})
    scoring: Number;
   

    // weighting.
    // 1. If you have only chosen weighting by question, then all the questions over however many sections will need to add up to 100%
    // 2. If you have chosen weighting by Both Section & Question then all questions within each section will need to add up to 100%.
    // The final questionnaire score will involve
    // - either simply adding up the scores
    // - or if it is weighted by question, then the scores for each question will be multiplied by the question weightings before adding for the final total
    // - or if weighted by section the the question section scores will be multiplied by the section weighting before adding for the final total.
    // - or if weighted by both Section & Question, then the final questionnaire score will be a combination of the above two scenarios.
    @Column({nullable : true})
    weighting: Number;

    @Column({ nullable: true })
    max_char: Number;

    @Column()
    type: QuestionType;
    
    @ManyToOne(() => Event, event => event.id) 
    event: Event;

    @ManyToOne(() => Questionnaire, questionnaire => questionnaire.id) 
    questionnaire: Questionnaire;

    @ManyToOne(() => Section, section => section.id, { onDelete: 'CASCADE' }) 
    section: Section;

    @OneToMany(() => QuestionOption, (q) => q.question)
    question_options: QuestionOption;
}

export enum QuestionType{
    YES_NO,
    ONE_CHOICE,
    MULTI_CHOICE,
    ONE_LINE_TEXT,
    PARAGRAPH_TEXT,
    DOCUMENT_UPLOAD
}
