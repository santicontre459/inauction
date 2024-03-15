import { UpdateResult } from 'typeorm';
import { Address } from '../../schema/address';
import { IRepo } from '../base/IBaseRepository';

export interface IAddressRepository  extends IRepo<Address> {
    updateAddress(id: string, item: Address): Promise<Address>;
}