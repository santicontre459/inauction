import { IRoleRepository } from './IRoleRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Role } from '../../schema/role';
import { getRepository } from "typeorm";

export default class RoleRepository extends BaseRepository<Role> implements IRoleRepository {

    public async getAll(): Promise<Array<Role>>  {
        const repository = getRepository(Role);
        return await repository.find();
    }

    getSubRolesByRoleId(roleId: string): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }
}

