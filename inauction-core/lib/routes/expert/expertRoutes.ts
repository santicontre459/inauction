import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { ExpertController } from '../../core/controller/experts/expertController';
import { Router } from 'express';

const expertRoutes = Router();

/** Retrieve expert by customer (Host || Bidder) */
expertRoutes.get(
    '/api/expert/:customer_id/active',  [
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])],
ExpertController.getExpertsByCustomer);


/** Retrieve expert by customer (Host || Bidder) */
expertRoutes.get(
'/api/expert/:customer_id/deleted',  [
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])],
ExpertController.getDeletedExpertsByCustomer);


/** Get Experts of specific */
expertRoutes.get('/api/expert',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
],
ExpertController.getExperts);

/** Expert can be created only by Admins of Respectively Host or Bidder */
expertRoutes.post('/api/expert',  [
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
],  ExpertController.create);

/** Retrieve Experts List available to work on new tasks  */
expertRoutes.get('/api/expert/task',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
],
ExpertController.getExpertsForTasks);

/** Retrieve an expert details */
expertRoutes.get('/api/expert/details/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], ExpertController.getExpert);


/** Update expert **/
expertRoutes.put('/api/expert/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], ExpertController.update);

/** Change Status of an expert (activate/deactivate) **/
expertRoutes.patch('/api/expert/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], ExpertController.changeStatus_expert);

/** DeleteAdmin An Expert **/
expertRoutes.delete('/api/expert/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], ExpertController.deleteAdmin);


export default expertRoutes;