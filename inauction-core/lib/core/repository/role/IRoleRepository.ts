import { Role } from '../../schema/role';
import { IRepo } from '../base/IBaseRepository';

export interface IRoleRepository  extends IRepo<Role> {

    getAll(): Promise<Array<Role>>

    getSubRolesByRoleId(roleId: string):Promise<Array<Role>>
}