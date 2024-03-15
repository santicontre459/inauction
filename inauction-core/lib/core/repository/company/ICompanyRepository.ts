import { Company } from '../../schema/company';
import { IRepo } from '../base/IBaseRepository';

export interface ICompanyRepository  extends IRepo<Company> {
    findById(id: string): Promise<Company>

    filterCompany(filter: any): Promise<Company>

    updateCompany(company_id: string, company_params: Company): Promise<Company>

    checkIfCompanyExist(businessRegNumber: string) : Promise<Company>
}
