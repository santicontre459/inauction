import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { ISectionRepository } from './ISectionRepository';
import { injectable } from 'inversify';
import { Section } from "../../schema/section";
@EntityRepository(Section)
export default class SectionRepository extends BaseRepository<Section> implements ISectionRepository {

    public async findById(id: string): Promise<Section> {
        const repository = getRepository(Section);
        return await repository.findOne(id);
    }

    public async filterSection(filter: any): Promise<Section> {
        const repository = getRepository(Section);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<Section>>  {
        const repository = getRepository(Section);       
        return await repository.find();
    }
   
    public async updateSection(section_id: string, section_params: Section):Promise<Section> {
        const repository = getRepository(Section);   
        await repository.update(section_id, section_params);
        return await repository.findOne(section_id);
    }

    public async deleteSection(id: string):Promise<any> {
        const repository = getRepository(Section);   
        return await repository.softDelete(id);
    }
}
