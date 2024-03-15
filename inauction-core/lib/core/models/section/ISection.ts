export interface ISection {
    id?: String;
    title: string;
    description: string;
    weighting: Number;
    eventid: string;
    questionnaireid: string;
}

export interface IDraftSection {
    title: string;
    description: string;
    weighting: Number;
    questions: [];
}