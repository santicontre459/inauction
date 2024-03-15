import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IQuestionOptionRepository } from './IQuestionOptionRepository';
import { injectable } from 'inversify';
import { QuestionOption } from "../../schema/questionOption";

@EntityRepository(QuestionOption)
export default class QuestionOptionRepository extends BaseRepository<QuestionOption> implements IQuestionOptionRepository {

    public async findById(id: string): Promise<QuestionOption> {
        const repository = getRepository(QuestionOption);
        return await repository.findOne(id);
    }

    public async filterQuestionOption(filter: any): Promise<QuestionOption> {
        const repository = getRepository(QuestionOption);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<QuestionOption>>  {
        const repository = getRepository(QuestionOption);       
        return await repository.find();
    }

    public async updateQuestionOption(question_option_id: string, question_option_params: QuestionOption):Promise<QuestionOption> {
        const repository = getRepository(QuestionOption);   
        await repository.update(question_option_id, question_option_params);
        return await repository.findOne(question_option_id);
    }

    public async deleteQuestionOption(id: string):Promise<any> {
        const repository = getRepository(QuestionOption);   
        return await repository.softDelete(id);
    }

}