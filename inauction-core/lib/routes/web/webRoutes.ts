import { SystemRoles } from '../../core/schema/role';
import { Application, Router } from 'express';
import { WebController } from '../../core/controller/web/webController';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';

const webRoutes = Router();

// Host Registration Form
// In the website we have a view which allow company to fill a form if they want to be part of iNegotio
// No Authentication needed
webRoutes.post('/api/host-registration-form', WebController.create_host_registration_form);


// Retrieve Host Registration Forms
// Can be used by Role: Superadmin
webRoutes.get('/api/host-registration-form',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    WebController.get_host_registration_forms
);

export default webRoutes;



