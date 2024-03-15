import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IQuestionRepository } from './IQuestionRepository';
import { injectable } from 'inversify';
import { Question } from "../../schema/question";

@EntityRepository(Question)
export default class QuestionRepository extends BaseRepository<Question> implements IQuestionRepository {

    public async findById(id: string): Promise<Question> {
        const repository = getRepository(Question);
        return await repository.findOne(id);
    }

    public async filterQuestion(filter: any): Promise<Question> {
        const repository = getRepository(Question);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<Question>>  {
        const repository = getRepository(Question);       
        return await repository.find();
    }
   
    public async updateQuestion(question_id: string, question_params: Question):Promise<Question> {
        const repository = getRepository(Question);   
        await repository.update(question_id, question_params);
        return await repository.findOne(question_id);
    }

    public async deleteQuestion(id: string):Promise<any> {
        const repository = getRepository(Question);   
        return await repository.softDelete(id);
    }
}
