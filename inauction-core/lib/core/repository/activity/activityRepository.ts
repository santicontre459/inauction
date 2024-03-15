import { getRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IActivityRepository } from './IAcitivityRepository';
import { Activity } from "../../schema/activity";

export default class ActivityRepository extends BaseRepository<Activity> implements IActivityRepository {

    public async findById(id: string): Promise<Activity> {
        const repository = getRepository(Activity);
        return await repository.findOne(id,{ where : { isDeleted: false }});
    }

    public async filterActivity(filter: any): Promise<Activity> {
        const repository = getRepository(Activity);
        return await repository.findOne(filter,{ where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<Activity>>  {
        const repository = getRepository(Activity);       
        return await repository.find(
            {
                where : { isDeleted: false },
                relations: ['category']
            }
        );
    }

    public async getActive(): Promise<Array<Activity>>  {
        const repository = getRepository(Activity);
        return await repository.find({ where : { isDeleted : false, status: 1 }, relations: ['category'] });
    }

    public async updateActivity(activity_id:string, activity_params: Activity):Promise<Activity> {
        const repository = getRepository(Activity);   
        await repository.update(activity_id, activity_params);
        return await repository.findOne(activity_id);
    }

    public async deleteActivity(id: string):Promise<any> {
        const repository = getRepository(Activity);   
        return await repository.softDelete(id);
    }

}