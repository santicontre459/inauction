import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IQuestionnaireRepository } from './IQuestionnaireRepository';
import { injectable } from 'inversify';
import { Questionnaire } from "../../schema/questionnaire";

@EntityRepository(Questionnaire)
export default class QuestionnaireRepository extends BaseRepository<Questionnaire> implements IQuestionnaireRepository {

    public async findById(id: string): Promise<Questionnaire> {
        const repository = getRepository(Questionnaire);
        return await repository.findOne(id);
    }

    public async filterQuestionnaire(filter: any): Promise<Questionnaire> {
        const repository = getRepository(Questionnaire);
        return await repository.findOne(filter);
    }

    public async getAll(query: any): Promise<Array<Questionnaire>>  {
        const repository = getRepository(Questionnaire);
        if (query) {
            return await repository.find({
                where: query,
                relations: ['event']
            });
        } else {
            return await repository.find({ relations: ['event']});
        }
    }

    public async updateQuestionnaire(questionnaire_id: string, questionnaire_params: Questionnaire):Promise<Questionnaire> {
        const repository = getRepository(Questionnaire);   
        await repository.update(questionnaire_id, questionnaire_params);
        return await repository.findOne(questionnaire_id);
    }

    public async deleteQuestionnaire(id: string):Promise<any> {
        const repository = getRepository(Questionnaire);   
        return await repository.softDelete(id);
    }

}
