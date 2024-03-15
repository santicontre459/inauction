import { IRepo } from '../base/IBaseRepository';
import { Questionnaire } from '../../schema/questionnaire';

export interface IQuestionnaireRepository  extends IRepo<Questionnaire> {

    findById(id: string): Promise<Questionnaire>

    filterQuestionnaire(filter: any): Promise<Questionnaire>

    getAll(query: any): Promise<Array<Questionnaire>>

    updateQuestionnaire(questionnaire_id: string, questionnaire_params: Questionnaire): Promise<Questionnaire>

    deleteQuestionnaire(id: String): Promise<boolean>
}