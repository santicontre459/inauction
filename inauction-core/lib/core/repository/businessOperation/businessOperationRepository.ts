import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IBusinessOperationRepository } from './IBusinessOperationRepository';
import { BusinessOperation } from "../../schema/businessOperation";

export default class BusinessOperationRepository extends BaseRepository<BusinessOperation> implements IBusinessOperationRepository {

    public async findById(id: string): Promise<BusinessOperation> {
        const repository = getRepository(BusinessOperation);
        return await repository.findOne(id, { where : { isDeleted: false }});
    }

    public async filterBusinessOperation(filter: any): Promise<BusinessOperation> {
        const repository = getRepository(BusinessOperation);
        return await repository.findOne(filter, { where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<BusinessOperation>>  {
        const repository = getRepository(BusinessOperation);
        return await repository.find({ where : { isDeleted: false }});
    }

    public async getActive(): Promise<Array<BusinessOperation>>  {
        const repository = getRepository(BusinessOperation);
        return await repository.find({ where : { isDeleted : false, status: 1 } });
    }

    public async updateBusinessOperation(businessOperation_id: string, businessOperation_params: any):Promise<BusinessOperation> {
        const repository = getRepository(BusinessOperation);
        await repository.update(businessOperation_id, businessOperation_params);
        return repository.findOne(businessOperation_id);
    }

    public async deleteBusinessOperation(id: string):Promise<any> {
        const repository = getRepository(BusinessOperation);
        return await repository.softDelete(id);
    }

    public async getDeleted(): Promise<Array<BusinessOperation>>  {
        const repository = getRepository(BusinessOperation);
        return await repository.find({ where : { isDeleted : true } });
    }
}