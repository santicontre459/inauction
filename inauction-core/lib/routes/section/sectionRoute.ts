import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { SectionController } from '../../core/controller/section/sectionController';

const sectionRoutes = Router();
    // todo: [AuthorizationCheck.checkJWT, AuthorizationCheck.checkRole([SystemRoles.Superadmin])],
    sectionRoutes.get(
        '/api/sections',  
        // [AuthorizationCheck.checkJWT], 
        SectionController.get_sections
    );
    sectionRoutes.get(
        '/api/section/:id',
        SectionController.get_section
    );
    sectionRoutes.post(
        '/api/section', 
        [AuthorizationCheck.checkJWT],
        SectionController.create_section
    );  
    sectionRoutes.put(
        '/api/section/:id',
        [AuthorizationCheck.checkJWT],
        SectionController.update_section
    );
    sectionRoutes.delete(
        '/api/section/:id',
        [AuthorizationCheck.checkJWT],
        SectionController.delete_section
    );

export default sectionRoutes;