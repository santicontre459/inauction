import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { RoleController } from '../../core/controller/role/roleController';

const roleRoutes = Router();

// Role
// Can be used by Role: Superadmin
roleRoutes.get('/api/role',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
    RoleController.get_roles);

export default roleRoutes;