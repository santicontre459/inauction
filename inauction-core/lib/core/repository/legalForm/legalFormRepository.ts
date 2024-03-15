import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { ILegalFormRepository } from './ILegalFormRepository';
import { LegalForm } from "../../schema/legalForm";

export default class LegalFormRepository extends BaseRepository<LegalForm> implements ILegalFormRepository {

    public async findById(id: string): Promise<LegalForm> {
        const repository = getRepository(LegalForm);
        return await repository.findOne(id, { where : { isDeleted: false }});
    }

    public async filterLegalForm(filter: any): Promise<LegalForm> {
        const repository = getRepository(LegalForm);
        return await repository.findOne(filter, { where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<LegalForm>>  {
        const repository = getRepository(LegalForm);
        return await repository.find({ where : { isDeleted: false }});
    }

    public async getActive(): Promise<Array<LegalForm>>  {
        const repository = getRepository(LegalForm);
        return await repository.find({ where : { isDeleted : false, status: 1 } });
    }

    public async updateLegalForm(legalForm_id: string, legalForm_params: any):Promise<LegalForm> {
        const repository = getRepository(LegalForm);
        await repository.update(legalForm_id, legalForm_params);
        return repository.findOne(legalForm_id);
    }

    public async deleteLegalForm(id: string):Promise<any> {
        const repository = getRepository(LegalForm);
        return await repository.softDelete(id);
    }

    public async getDeleted(): Promise<Array<LegalForm>>  {
        const repository = getRepository(LegalForm);
        return await repository.find({ where : { isDeleted : true } });
    }
}