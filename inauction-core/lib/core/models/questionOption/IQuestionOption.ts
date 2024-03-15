export interface IQuestionOption {
    id?: String;
    questionid: string;
    option: String;
    score: Number;
    fail: Boolean;
    max_char: Number;
}
export interface IQuestionDraftOption {
    option: String;
    score: Number;
    fail: Boolean;
    max_char: Number;
}
