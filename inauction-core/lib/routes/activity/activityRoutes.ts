import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { ActivityController } from '../../core/controller/activity/activityController';

const activityRoutes = Router();

// Retrieve Activities
// Can be used by Role: Superadmin
activityRoutes.get(
    '/api/activity',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    ActivityController.get_activities
);

// Retrieve Activities for Customer
// Can be used by Role: Host or Bidder
activityRoutes.get(
    '/api/activity/customer',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder, SystemRoles.Superadmin])
    ],
    ActivityController.get_activitiesCustomer
);

// Retrieve an Activity Details
// Can be used by Role: Superadmin
activityRoutes.get(
    '/api/activity/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    ActivityController.get_activity
);


// Create Activity
// Can be used by Role: Superadmin
activityRoutes.post(
    '/api/activity',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    ActivityController.create_activity
);

// Update Activity
// Can be used by Role: Superadmin
activityRoutes.put(
    '/api/activity/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    ActivityController.update_activity
);

// Change Activity Status
// Activate/Deactivate
// Can be used by Role: Superadmin
activityRoutes.patch('/api/activity/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    ActivityController.changeStatus_activity);

// Delete Activity
// Can be used by Role: Superadmin
activityRoutes.delete(
    '/api/activity/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    ActivityController.delete_activity
);

activityRoutes.post(
    '/api/activity/company',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder, SystemRoles.Superadmin])
    ],
    ActivityController.add_activity_to_company
);

activityRoutes.get(
    '/api/activity/company/:company_id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder, SystemRoles.Superadmin])
    ],
    ActivityController.getCompanyActivities
);

activityRoutes.delete(
    '/api/activity/company/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder, SystemRoles.Superadmin])
    ],
    ActivityController.remove_activity_company
);

export default activityRoutes;