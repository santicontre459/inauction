import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { EventCategoryController } from '../../core/controller/eventCategory/eventCategoryController';

const eventCategoryRoutes = Router();

    // Retrieve Event Categories
    // Can be used by Role: Superadmin
    eventCategoryRoutes.get(
        '/api/event-category',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        EventCategoryController.get_eventCategories
    );

    // Retrieve Event Categories
    // Can be used by Role: Host
    eventCategoryRoutes.get(
        '/api/event-category/host',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Host])
        ],
        EventCategoryController.get_eventCategoriesHost
    );

    // Retrieve an Event Category Details
    // Can be used by Role: Superadmin
    eventCategoryRoutes.get(
        '/api/event-category/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        EventCategoryController.get_eventCategory
    );

    // Create Event Category
    // Can be used by Role: Superadmin
    eventCategoryRoutes.post(
        '/api/event-category',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        EventCategoryController.create_eventCategory
    );

    // Update Event Category
    // Can be used by Role: Superadmin
    eventCategoryRoutes.put(
        '/api/event-category/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        EventCategoryController.update_eventCategory
    );

    // Change Event Category Status
    // Activate/Deactivate
    // Can be used by Role: Superadmin
    eventCategoryRoutes.patch(
        '/api/event-category/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        EventCategoryController.changeStatus_eventCategory
    );

    // Delete Event Category
    // Can be used by Role: Superadmin
    eventCategoryRoutes.delete(
        '/api/event-category/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        EventCategoryController.delete_eventCategory
    );

export default eventCategoryRoutes;