import { getRepository } from "typeorm";
import { Category } from "../../schema/category";
import { BaseRepository } from '../base/BaseRepository';
import { ICategoryRepository } from './ICategoryRepository';
import {EventCategory} from "../../schema/eventCategory";

export default class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository {

    public async findById(id: string): Promise<Category> {
        const categoryRepository = getRepository(Category);
        return await categoryRepository.findOne(id, { where : { isDeleted: false }});
    }

    public async filterCategory(filter: any): Promise<Category> {
        const categoryRepository = getRepository(Category);
        return await categoryRepository.findOne(filter, { where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<Category>>  {
        const categoryRepository = getRepository(Category);       
        return await categoryRepository.find({ where : { isDeleted: false }});
    }

    public async getActive(): Promise<Array<Category>>  {
        const repository = getRepository(Category);
        return await repository.find({ where : { isDeleted : false, status: 1 } });
    }

    public async updateCategory(category_id: string, category_params: Category):Promise<Category> {
        const repository = getRepository(Category);   
        await repository.update(category_id, category_params);
        return await repository.findOne(category_id);
    
    }

    public async deleteCategory(id: string):Promise<any> {
        const repository = getRepository(Category);   
        return await repository.softDelete(id);
    }

}