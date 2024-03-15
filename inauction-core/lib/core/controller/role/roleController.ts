import RoleRepository from '../../repository/role/RoleRepository';
import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { Role } from '../../schema/role';
import { IRoleRepository } from "../../repository/role/IRoleRepository";

@injectable()
export class RoleController {


    // Get All Roles
    public static async get_roles(req: Request, res: Response) {
        let  roleRepository: IRoleRepository = new RoleRepository(Role);
        const roles = await roleRepository.getAll();

        if (roles.length > 0)
            res.send(roles);
        else
            res.send([]);

    }
}
