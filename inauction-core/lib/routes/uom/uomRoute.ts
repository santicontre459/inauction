import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { UomController } from '../../core/controller/uom/uomController';

const uomRoutes = Router();

// Retrieve Uoms
// Can be used by Role: Superadmin
uomRoutes.get('/api/uom',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
UomController.get_uoms);

// Retrieve deleted Uoms
// Can be used by Role: Superadmin
uomRoutes.get('/api/uom/deleted',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
UomController.get_deleted_uoms);

// Retrieve Uoms
// Can be used by Role: Host
uomRoutes.get('/api/uom/host',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host])
    ],
UomController.get_uomsHost);


// Retrieve an Uom Details
// Can be used by Role: Superadmin
uomRoutes.get('/api/uom/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
UomController.get_uom);

// Create Uom
// Can be used by Role: Superadmin
uomRoutes.post('/api/uom',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
UomController.create_uom);

// Update Uom
// Can be used by Role: Superadmin
uomRoutes.put('/api/uom/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
UomController.update_uom);

// Change Uom Status
// Activate/Deactivate
// Can be used by Role: Superadmin
uomRoutes.patch('/api/uom/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    UomController.changeStatus_uom);

// Delete Uom
// Can be used by Role: Superadmin
uomRoutes.delete('/api/uom/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
UomController.delete_uom);

export default uomRoutes;