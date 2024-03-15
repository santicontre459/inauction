import { IRepo } from './../base/IBaseRepository';
import { Question } from '../../schema/question';

export interface IQuestionRepository  extends IRepo<Question> {

    findById(id: string): Promise<Question>

    filterQuestion(filter: any): Promise<Question>

    getAll(): Promise<Array<Question>>

    updateQuestion(question_id: string, question_params: Question): Promise<Question>

    deleteQuestion(id: String): Promise<boolean>
}