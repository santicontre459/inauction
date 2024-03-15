import { IRepo } from '../base/IBaseRepository';
import { QuestionOption } from '../../schema/questionOption';

export interface IQuestionOptionRepository  extends IRepo<QuestionOption> {

    findById(id: string): Promise<QuestionOption>

    filterQuestionOption(filter: any): Promise<QuestionOption>

    getAll(): Promise<Array<QuestionOption>>

    updateQuestionOption(question_option_id: string, question_option_params: QuestionOption): Promise<QuestionOption>

    deleteQuestionOption(id: String): Promise<boolean>
}