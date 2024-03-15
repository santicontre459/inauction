import { QuestionType } from '../../schema/question';
export interface IQuestion {
    id?: String;
    title: string;
    description: string;
    scoring_criteria: string;
    is_mandatory: boolean;
    scoring: Number;
    weighting: Number;
    type: QuestionType;    
    eventid: string;
    questionnaireid: string;
    sectionid: string;
}
export interface IDraftQuestion {
    title: string;
    description: string;
    scoring_criteria: string;
    is_mandatory: boolean;
    scoring: Number;
    weighting: Number;
    type: QuestionType;
    questionOption: [];
    max_char : Number;
}
