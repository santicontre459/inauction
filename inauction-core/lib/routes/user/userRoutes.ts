import { SystemRoles } from '../../core/schema/role';
import { Application, Router } from 'express';
import { UserController } from '../../core/controller/user/userController';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';

const userRouters = Router();

// Retrieve Superadmin User
// Can be used by Role: Superadmin
userRouters.get('/api/user',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    UserController.get_users
);

// Add Superadmin User
// Can be used by Role: Superadmin
// Can be used by SubRole: Admin
userRouters.post('/api/user',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin]),
        AuthorizationCheck.checkSubRole([SystemRoles.SuperadminAdmin])
    ],
    UserController.create_user
);

export default userRouters;



