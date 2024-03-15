import { getRepository } from "typeorm";
import { EventCategory } from "../../schema/eventCategory";
import { BaseRepository } from '../base/BaseRepository';
import { IEventCategoryRepository } from './IEventCategoryRepository';

class EventCategoryRepository extends BaseRepository<EventCategory> implements IEventCategoryRepository {

    public async findById(id: string): Promise<EventCategory> {
        const repository = getRepository(EventCategory);
        return await repository.findOne(id, { where : { isDeleted: false }});
    }

    public async filterEventCategory(filter: any): Promise<EventCategory> {
        const repository = getRepository(EventCategory);
        return await repository.findOne(filter, { where : { isDeleted: false }});
    }

    public async getAll(): Promise<Array<EventCategory>>  {
        const repository = getRepository(EventCategory);       
        return await repository.find({ where : { isDeleted: false }});
    }

    public async getActive(): Promise<Array<EventCategory>>  {
        const repository = getRepository(EventCategory);
        return await repository.find({ where : { isDeleted : false, status: 1 } });
    }

    public async updateEventCategory(eventCategory_id: string, eventCategory_params: any):Promise<EventCategory> {
        const repository = getRepository(EventCategory);
        await repository.update(eventCategory_id, eventCategory_params);
        return repository.findOne(eventCategory_id);
    }

    public async deleteEventCategory(id: string):Promise<any> {
        const repository = getRepository(EventCategory);
        return await repository.softDelete(id);
    }
}

export default EventCategoryRepository;