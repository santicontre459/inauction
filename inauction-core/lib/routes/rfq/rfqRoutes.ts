import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { RFQController } from '../../core/controller/rfq/rfqController';

const rfqRoutes = Router();
    // todo check if this in needed in later phases

export default rfqRoutes;