import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { LegalFormController } from '../../core/controller/legalForm/legalFormController';

const legalFormRoutes = Router();

// Retrieve Legal Forms
// Can be used by Role: Superadmin
legalFormRoutes.get('/api/legal-form',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
LegalFormController.get_legalForms);

// Retrieve deleted Legal Forms
// Can be used by Role: Superadmin
legalFormRoutes.get('/api/legal-form/deleted',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
LegalFormController.get_deletedLegalForms);

// Retrieve Legal Forms
// Can be used by Role: Host or Bidder
legalFormRoutes.get('/api/legal-form/customer',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Bidder, SystemRoles.Host])
    ],
LegalFormController.get_legalFormsCustomer);


// Retrieve an Legal Form Details
// Can be used by Role: Superadmin
legalFormRoutes.get('/api/legal-form/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
LegalFormController.get_legalForm);

// Create Legal Form
// Can be used by Role: Superadmin
legalFormRoutes.post('/api/legal-form',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
LegalFormController.create_legalForm);

// Update Legal Form
// Can be used by Role: Superadmin
legalFormRoutes.put('/api/legal-form/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
LegalFormController.update_legalForm);

// Change Legal Form Status
// Activate/Deactivate
// Can be used by Role: Superadmin
legalFormRoutes.patch('/api/legal-form/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    LegalFormController.changeStatus_legalForm);

// Delete Legal Form
// Can be used by Role: Superadmin
legalFormRoutes.delete('/api/legal-form/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
LegalFormController.delete_legalForm);

export default legalFormRoutes;