import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Router } from 'express';
import { CompanyController } from '../../core/controller/company/companyController';

const companyRoutes = Router();

/**
 * Get Company Details
 */
companyRoutes.get(
'/api/company/:id',[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
], CompanyController.get_company);

/**
 * Update Address
 */
 companyRoutes.put(
    '/api/company/address',[
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
    ], CompanyController.update_address);

    
/**
 * Update Company
 */
companyRoutes.put(
'/api/company/:id',[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
], CompanyController.update_company);



export default companyRoutes;
