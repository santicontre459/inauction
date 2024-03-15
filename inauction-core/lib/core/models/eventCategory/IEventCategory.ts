import { EventCategoryStatus } from '../../schema/eventCategory';

export interface IEventCategory {
    id?: String;
    name: string;
    description: String;
    status?: EventCategoryStatus;
}