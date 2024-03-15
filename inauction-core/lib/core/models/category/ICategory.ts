import { CategoryStatus } from '../../schema/category';
import { IActivity } from "../activity/IActivity";

export interface ICategoryModel {
    id?: string;
    name: string;
    code: string;
    activities?: IActivity[];
    status?: CategoryStatus;
}