import { SystemRoles } from '../../core/schema/role';
import { Application, Router } from 'express';
import { BidderController } from '../../core/controller/bidder/bidderController';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';


const bidderRoutes = Router();

// Retrieve Bidders
// Can be used by Role: Superadmin
bidderRoutes.get('/api/bidder',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin, SystemRoles.Host])
    ],
    BidderController.get_bidders
);

// Retrieve Category Bidders
bidderRoutes.get('/api/bidders/category/:activity_id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin, SystemRoles.Host])
    ],
    BidderController.get_bidders_category
);

// Retrieve all Bidder Registration Verifications
// Can be used by Role: Superadmin
bidderRoutes.get('/api/bidder/verification',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    BidderController.get_bidder_verifications
);

// Change Bidder Verification Status
// Can be used by Role: Superadmin
bidderRoutes.post('/api/bidder/verification',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    BidderController.change_bidder_verification_status
);


export default bidderRoutes;



