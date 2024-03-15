import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { BusinessOperationController } from '../../core/controller/businessOperation/businessOperationController';

const businessOperationRoutes = Router();

// Retrieve Business Operations
// Can be used by Role: Superadmin
businessOperationRoutes.get('/api/business-operation',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
BusinessOperationController.get_businessOperations);

// Retrieve deleted Business Operations
// Can be used by Role: Superadmin
businessOperationRoutes.get('/api/business-operation/deleted',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
BusinessOperationController.get_deletedBusinessOperations);
// Retrieve Business Operations
// Can be used by Role: Host or Bidder or Superadmin when they are creating a Host
// or when adding a Host Registration Form
businessOperationRoutes.get('/api/business-operation/customer',
BusinessOperationController.get_businessOperationsCustomer);


// Retrieve an Business Operation Details
// Can be used by Role: Superadmin
businessOperationRoutes.get('/api/business-operation/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
BusinessOperationController.get_businessOperation);

// Create Business Operation
// Can be used by Role: Superadmin
businessOperationRoutes.post('/api/business-operation',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
BusinessOperationController.create_businessOperation);

// Update Business Operation
// Can be used by Role: Superadmin
businessOperationRoutes.put('/api/business-operation/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
BusinessOperationController.update_businessOperation);

// Change Business Operation Status
// Activate/Deactivate
// Can be used by Role: Superadmin
businessOperationRoutes.patch('/api/business-operation/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    BusinessOperationController.changeStatus_businessOperation);

// Delete Business Operation
// Can be used by Role: Superadmin
businessOperationRoutes.delete('/api/business-operation/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
],
BusinessOperationController.delete_businessOperation);

export default businessOperationRoutes;
