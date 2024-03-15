import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { ICompanyRepository } from './ICompanyRepository';
import { Company } from "../../schema/company";

export default class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
    
    public async findById(id: string): Promise<Company> {
        const repository = getRepository(Company);
        return await repository.findOne(id, { relations: ['businessOperation', 'address']});
    }

    public async filterCompany(filter: any): Promise<Company> {
        const repository = getRepository(Company);
        return await repository.findOne(filter, { relations: ['businessOperation', 'address']});
    }

    public async updateCompany(company_id: string, company_params: Company):Promise<Company> {
        const repository = getRepository(Company);   
        await repository.update(company_id, company_params);
        return await repository.findOne(company_id, { relations: ['businessOperation', 'address']});
    }


    public async checkIfCompanyExist(businessRegNumber: string): Promise<Company> {
        const repository = getRepository(Company);
        return await repository.findOne({ where: { businessRegNumber: businessRegNumber } });
    }

}       