import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { ICurrencyRepository } from './ICurrencyRepository';
import { Currency } from "../../schema/currency";

export default class CurrencyRepository extends BaseRepository<Currency> implements ICurrencyRepository {

    public async findById(id: string): Promise<Currency> {
        const repository = getRepository(Currency);
        return await repository.findOne(id, { where : { isDeleted: false }});
    }

    public async filterCurrency(filter: any): Promise<Currency> {
        const repository = getRepository(Currency);
        return await repository.findOne(filter, { where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<Currency>>  {
        const repository = getRepository(Currency);       
        return await repository.find({ where : { isDeleted: false }});
    }

    public async getActive(): Promise<Array<Currency>>  {
        const repository = getRepository(Currency);
        return await repository.find({ where : { isDeleted : false, status: 1 } });
    }

    public async updateCurrency(currency_id: string, currency_params: Currency):Promise<Currency> {
        const repository = getRepository(Currency);   
        await repository.update(currency_id, currency_params);
        return await repository.findOne(currency_id);
    }

    public async deleteCurrency(id: string):Promise<any> {
        const repository = getRepository(Currency);   
        return await repository.softDelete(id);
    }

}