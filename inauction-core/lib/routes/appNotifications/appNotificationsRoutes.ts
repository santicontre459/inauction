import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Router } from 'express';
import { AppNotificationsController } from '../../core/controller/appNotification/appNotificationsController';

const appNotificationsRoutes = Router();

appNotificationsRoutes.get(
    '/api/app-notifications',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
    ], AppNotificationsController.getAppNotifications);


appNotificationsRoutes.post(
    '/api/markread-notification',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
    ], AppNotificationsController.setReadNotification);

export default appNotificationsRoutes;