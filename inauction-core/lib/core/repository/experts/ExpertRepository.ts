import { IExpertRepository } from './IExpertRepository';
import { Expert } from "../../schema/expert";
import { BaseRepository } from "../base/BaseRepository";
import { getRepository } from 'typeorm';

export default class ExpertRepository extends BaseRepository<Expert> implements IExpertRepository {

    public async getAll(query: any): Promise<Array<Expert>> {

        const expertRepository = getRepository(Expert);
        if (query) {
            return await expertRepository.find({ where: query, relations: ['user'] } );
        } else {
            return await expertRepository.find({ relations: ['user']});
        }
    }

    public async findById(id: string): Promise<Expert> {
        const repository = getRepository(Expert);
        return await repository.findOne({
                where : {
                    id: id,
                    isDeleted: false,
                    deletedByAdmin: false
                },
                relations: ['user', 'customer']
            }
        );
    }

    public async filter(filter: any): Promise<Expert> {
        const expertRepository = getRepository(Expert);
        return await expertRepository.findOne(filter);
    }

    public async updateExpert(expert_id: string, expert_params: Expert):Promise<Expert> {
        const repository = getRepository(Expert);
        await repository.update(expert_id, expert_params);
        return repository.findOne(expert_id, { relations: ['user']});
    }

    public async checkIfExpertExists(id: string): Promise<Expert> {
        const expertRepository = getRepository(Expert);
        return await expertRepository.findOne({ where: { id: id } });
    }

}