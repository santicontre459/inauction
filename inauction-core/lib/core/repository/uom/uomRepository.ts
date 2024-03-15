import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IUomRepository } from './IUomRepository';
import { Uom } from "../../schema/uom";

@EntityRepository(Uom)
export default class UomRepository extends BaseRepository<Uom> implements IUomRepository {

    public async findById(id: string): Promise<Uom> {
        const repository = getRepository(Uom);
        return await repository.findOne(id, { where : { isDeleted: false }});
    }

    public async filterUom(filter: any): Promise<Uom> {
        const repository = getRepository(Uom);
        return await repository.findOne(filter, { where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<Uom>>  {
        const repository = getRepository(Uom);
        return await repository.find({ where : { isDeleted: false }});
    }

    public async getActive(): Promise<Array<Uom>>  {
        const repository = getRepository(Uom);
        return await repository.find({ where : { isDeleted : false, status: 1 } });
    }

    public async updateUom(uom_id: string, uom_params: any):Promise<Uom> {
        const repository = getRepository(Uom);
        await repository.update(uom_id, uom_params);
        return repository.findOne(uom_id);
    }

    public async deleteUom(id: string):Promise<any> {
        const repository = getRepository(Uom);
        return await repository.softDelete(id);
    }

    public async getDeleted(): Promise<Array<Uom>>  {
        const repository = getRepository(Uom);
        return await repository.find({ where : { isDeleted : true } });
    }
}