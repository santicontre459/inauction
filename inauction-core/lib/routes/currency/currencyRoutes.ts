import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { CurrencyController } from '../../core/controller/currency/currencyController';

const currencyRoutes = Router();

    // Retrieve Currencies
    // Can be used by Role: Superadmin
    currencyRoutes.get(
        '/api/currency',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        CurrencyController.get_currencies
    );

    // Retrieve Currencies
    // Can be used by Role: Host
    currencyRoutes.get(
        '/api/currency/host',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Host])
        ],
        CurrencyController.get_currenciesHost
    );

    // Retrieve an Currency Details
    // Can be used by Role: Superadmin
    currencyRoutes.get(
        '/api/currency/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        CurrencyController.get_currency
    );

    // Create Currency
    // Can be used by Role: Superadmin
    currencyRoutes.post(
        '/api/currency',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        CurrencyController.create_currency
    );

    // Update Currency
    // Can be used by Role: Superadmin
    currencyRoutes.put(
        '/api/currency/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        CurrencyController.update_currency
    );

    // Change Currency Status
    // Activate/Deactivate
    // Can be used by Role: Superadmin
    currencyRoutes.patch(
        '/api/currency/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        CurrencyController.changeStatus_currency
    );

    // Delete Currency
    // Can be used by Role: Superadmin
    currencyRoutes.delete(
        '/api/currency/:id',
        [
            AuthorizationCheck.checkJWT,
            AuthorizationCheck.checkRole([SystemRoles.Superadmin])
        ],
        CurrencyController.delete_currency
    );

export default currencyRoutes;