import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Router } from 'express';
import { InviteBidderController } from '../../core/controller/inviteBidder/inviteBidderController';

const inviteBidderRoutes = Router();

/**
 * Get Bidder Invitations
 * used by: Superadmin
 */
inviteBidderRoutes.get(
'/api/invite-bidder',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host]),
    AuthorizationCheck.checkSubRole(
        [
            SystemRoles.HostAdmin,
            SystemRoles.HostExpert
        ]
    )
], InviteBidderController.getInvitations);

/**
 * Get Bidder Invitations
 * used by: Superadmin
 */
inviteBidderRoutes.get(
'/api/invite-bidder/:host_id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
], InviteBidderController.getBidderInvitationsByHost);

// Invite Bidder
// Can be used by Role: Host
inviteBidderRoutes.post(
'/api/invite-bidder',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host])
], InviteBidderController.inviteBidder);

export default inviteBidderRoutes;