import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { QuestionnaireController } from '../../core/controller/questionnaire/questionnaireController';

const questionnaireRoutes = Router();

// todo add validation for experts with tasks to update questionnaire which should have only create full event type task
// todo add validations for sections total weight and not empty attributes define a property attribute that does validation for sections

questionnaireRoutes.post(
    '/api/event/questionnaire/update',
    [AuthorizationCheck.checkJWT],
    QuestionnaireController.updateQuestionnaireOnEventStep3
);

questionnaireRoutes.get(
    '/api/questionair-details/:questionair_id',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder])
    ],
    QuestionnaireController.getQuestionairDetails);

export default questionnaireRoutes;