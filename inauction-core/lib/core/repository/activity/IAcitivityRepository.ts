import { IRepo } from '../base/IBaseRepository';
import { Activity } from '../../schema/activity';

export interface IActivityRepository  extends IRepo<Activity> {

    findById(id: string): Promise<Activity>

    filterActivity(filter: any): Promise<Activity>

    getAll(): Promise<Array<Activity>>

    getActive(): Promise<Array<Activity>>

    updateActivity(activity_id:string, activity_params: Activity): Promise<Activity>

    deleteActivity(id: String): Promise<boolean>
}