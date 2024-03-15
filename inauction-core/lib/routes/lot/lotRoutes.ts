import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { LotController } from '../../core/controller/lot/lotController';

const lotRoutes = Router();

    // todo: [AuthorizationCheck.checkJWT, AuthorizationCheck.checkRole([SystemRoles.Superadmin])],

    lotRoutes.get(
        '/api/lots',  
        // [AuthorizationCheck.checkJWT], 
        LotController.get_lots
    );
    lotRoutes.get(
        '/api/lot/:id',
        LotController.get_lot
    );
    lotRoutes.post(
        '/api/lot', 
        [AuthorizationCheck.checkJWT],
        LotController.create_lot
    );   
    lotRoutes.post(
        '/api/lotDraft', 
        [AuthorizationCheck.checkJWT],
        LotController.create_lot_draft
    );  
    lotRoutes.put(
        '/api/lot/:id',
        [AuthorizationCheck.checkJWT],
        LotController.update_lot
    );
    lotRoutes.delete(
        '/api/lot/:id',
        [AuthorizationCheck.checkJWT],
        LotController.delete_lot
    );

export default lotRoutes;