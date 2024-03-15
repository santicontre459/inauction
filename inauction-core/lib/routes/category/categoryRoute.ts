import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { CategoryController } from '../../core/controller/category/categoryController';

const categoryRoutes = Router();

// Retrieve Activity Categories
// Can be used by Role: Superadmin
categoryRoutes.get(
    '/api/category',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.get_categories
);

// Retrieve Active Activity Categories
// Can be used by Role: Superadmin
categoryRoutes.get(
    '/api/category/active',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.get_active_categories
);

// Get Category Details
// Can be used by Role: Superadmin
categoryRoutes.get(
    '/api/category/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.get_category
);

// Create Category
// Can be used by Role: Superadmin
categoryRoutes.post(
    '/api/category',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.create_category
);

// Update Category
// Can be used by Role: Superadmin
categoryRoutes.put(
    '/api/category/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.update_category
);

// Change Activity Category Status
// Activate/Deactivate
// Can be used by Role: Superadmin
categoryRoutes.patch(
    '/api/category/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.changeStatus_category
);

// Delete Category
// Can be used by Role: Superadmin
categoryRoutes.delete(
    '/api/category/:id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    CategoryController.delete_category
);

export default categoryRoutes;