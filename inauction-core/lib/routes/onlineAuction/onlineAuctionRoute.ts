import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { OnlineAuctionController } from '../../core/controller/onlineAuction/onlineAuctionController';

const onlineAuctionRoutes = Router();
    // todo check if this in needed in later phases

export default onlineAuctionRoutes;