import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IEventParticipantRepository } from './IEventParticipantRepository';
import { injectable } from 'inversify';
import { EventParticipant } from "../../schema/eventParticipant";

@EntityRepository(EventParticipant)
export default class EventParticipantRepository extends BaseRepository<EventParticipant> implements IEventParticipantRepository {

    public async findById(id: string): Promise<EventParticipant> {
        const repository = getRepository(EventParticipant);
        return await repository.findOne(id);
    }

    public async filterEventParticipant(filter: any): Promise<EventParticipant> {
        const repository = getRepository(EventParticipant);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<EventParticipant>>  {
        const repository = getRepository(EventParticipant);       
        return await repository.find();
    }

    public async updateEventParticipant(eventParticipant_id: string, eventParticipant_params: EventParticipant):Promise<EventParticipant> {
        const repository = getRepository(EventParticipant);   
        await repository.update(eventParticipant_id, eventParticipant_params);
        return await repository.findOne(eventParticipant_id);
    }

    public async deleteEventParticipant(id: string):Promise<any> {
        const repository = getRepository(EventParticipant);   
        return await repository.softDelete(id);
    }
}
