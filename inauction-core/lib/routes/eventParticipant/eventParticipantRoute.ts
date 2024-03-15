import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { EventInviteParticipantController } from '../../core/controller/eventInvitateParticipant/eventInvitateParticipantController';

const eventParticipantRoute = Router();
// todo: [AuthorizationCheck.checkJWT, AuthorizationCheck.checkRole([SystemRoles.Superadmin])],

eventParticipantRoute.post(
    '/api/eventParticipants',
    [AuthorizationCheck.checkJWT],
    EventInviteParticipantController.create_eventInvitedParticipants
);

eventParticipantRoute.get(
    '/api/eventParticipants/:eventid',
    // [AuthorizationCheck.checkJWT], 
    EventInviteParticipantController.get_eventParticipants
);

export default eventParticipantRoute;