import { IAddressRepository } from './IAddressRepository';
import { Address } from '../../schema/address';
import { getRepository, UpdateResult } from "typeorm";
import { BaseRepository } from '../base/BaseRepository';

export default class AddressRepository extends BaseRepository<Address> implements IAddressRepository {

    public async findById(id: string): Promise<Address> {
        const addressRepository = getRepository(Address);
        return await addressRepository.findOne(id);
    }

    public async updateAddress(id: string, item: Address): Promise<Address> {
        const addressRepository = getRepository(Address);
        await addressRepository.update(id, item);
        return await addressRepository.findOne(id);
    }
}