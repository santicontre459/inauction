import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { EventController } from '../../core/controller/event/eventController';

const eventRoutes = Router();

/**
 * Create Draft Event
 * Can be used by Host Role with Admin or Expert subrole
 */
eventRoutes.post(
    '/api/event/draft',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
        AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.HostExpert, SystemRoles.BidderAdmin])
    ],
    EventController.create_event_draft);

eventRoutes.post(
    '/api/event/publish',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
        AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.HostExpert, SystemRoles.BidderAdmin])
    ],
    EventController.publishEvent);

eventRoutes.get(
    '/api/event-details/:event_id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
    ],
    EventController.getEventDetails);

eventRoutes.get(
    '/api/events/:status',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.HostExpert, SystemRoles.BidderAdmin])
    ],
    EventController.get_events);


export default eventRoutes;