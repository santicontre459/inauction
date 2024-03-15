import { getRepository, EntityRepository } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';
import { IEventInvitationRepository } from './IEventInvitationRepository';
import { injectable } from 'inversify';
import { EventInvitation } from "../../schema/eventInvitation";

@EntityRepository(EventInvitation)
export default class EventInvitationRepository extends BaseRepository<EventInvitation> implements IEventInvitationRepository {

    public async findById(id: string): Promise<EventInvitation> {
        const repository = getRepository(EventInvitation);
        return await repository.findOne(id);
    }

    public async filterEventInvitation(filter: any): Promise<EventInvitation> {
        const repository = getRepository(EventInvitation);
        return await repository.findOne(filter);
    }

    public async getAll(): Promise<Array<EventInvitation>>  {
        const repository = getRepository(EventInvitation);       
        return await repository.find();
    }

    public async updateEventInvitation(eventInvitation_id: string, eventInvitation_params: EventInvitation):Promise<EventInvitation> {
        const repository = getRepository(EventInvitation);   
        await repository.update(eventInvitation_id, eventInvitation_params);
        return await repository.findOne(eventInvitation_id);
    }

    public async deleteEventInvitation(id: string):Promise<any> {
        const repository = getRepository(EventInvitation);   
        return await repository.softDelete(id);
    }
}
