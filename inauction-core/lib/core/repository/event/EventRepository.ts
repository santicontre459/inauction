import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IEventRepository } from './IEventRepository';
import { injectable } from 'inversify';
import { Event, EventProgressStatus } from "../../schema/event";

@EntityRepository(Event)
export default class EventRepository extends BaseRepository<Event> implements IEventRepository {

    public async findById(id: string): Promise<Event> {
        const repository = getRepository(Event);
        return await repository.findOne(id);
    }

    public async filterEvent(filter: any): Promise<Event> {
        const repository = getRepository(Event);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<Event>> {
        const repository = getRepository(Event);
        return await repository.find({
            order: {
                createdAt: "DESC",
            },
            relations: ['currency', 'host', 'eventCategory', 'activity', 'onlineAuctions', 'rfqs', 'questionNaires']
        });
    }

    public async getEventsByStatus(status: EventProgressStatus): Promise<Array<Event>> {
        const repository = getRepository(Event);
        return await repository.find({
            order: {
                createdAt: "DESC",
            },
            where: { progressStatus: status },
            relations: ['currency', 'host', 'eventCategory', 'activity', 'onlineAuctions', 'rfqs', 'questionNaires']
        });
    }

    public async updateEvent(event_id: string, event_params: Event): Promise<Event> {
        const repository = getRepository(Event);
        await repository.update(event_id, event_params);
        return await repository.findOne({ where: { id: event_id }, relations: ['currency', 'host', 'eventCategory', 'activity', 'onlineAuctions', 'rfqs', 'questionNaires'] });
    }

    public async deleteEvent(id: string): Promise<any> {
        const repository = getRepository(Event);
        return await repository.softDelete(id);
    }
}
