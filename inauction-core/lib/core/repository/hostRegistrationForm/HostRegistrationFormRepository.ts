import { getRepository } from "typeorm";
import { HostRegistrationForm } from "../../schema/hostRegistrationForm";
import { BaseRepository } from '../base/BaseRepository';
import { IHostRegistrationFormRepository } from './IHostRegistrationFormRepository';

export default class HostRegistrationFormRepository extends BaseRepository<HostRegistrationForm> implements IHostRegistrationFormRepository {

    public async getAll(): Promise<Array<HostRegistrationForm>> {

        const hostRegistrationFormRepository = getRepository(HostRegistrationForm);
        return await hostRegistrationFormRepository.find({ relations: ['entityBusinessOperation']});
    }
}