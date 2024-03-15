import { SystemRoles } from '../../core/schema/role';
import { Application, Router } from 'express';
import { HostController } from '../../core/controller/host/hostController';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';


const hostRouters = Router();

// Retrieve Hosts
// Can be used by Role: Superadmin
hostRouters.get('/api/host',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    HostController.get_hosts
);

// Add Host
// Can be used by Role: Superadmin
// Can be used by SubRole: Admin
hostRouters.post('/api/host',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin]),
        AuthorizationCheck.checkSubRole([SystemRoles.SuperadminAdmin])
    ],
    HostController.create_host
);


export default hostRouters;



