import { IRepo } from '../base/IBaseRepository';
import { Category } from '../../schema/category';

export interface ICategoryRepository  extends IRepo<Category> {

    findById(id: string): Promise<Category>

    filterCategory(filter: any): Promise<Category>

    getAll(): Promise<Array<Category>>

    getActive(): Promise<Array<Category>>

    updateCategory(category_id: string,category_params: Category): Promise<Category>

    deleteCategory(id: String): Promise<boolean>
}