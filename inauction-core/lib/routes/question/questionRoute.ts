import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { QuestionController } from '../../core/controller/question/questionController';

const questionRoutes = Router();
    // todo: [AuthorizationCheck.checkJWT, AuthorizationCheck.checkRole([SystemRoles.Superadmin])],
    questionRoutes.get(
        '/api/questions',  
        // [AuthorizationCheck.checkJWT], 
        QuestionController.get_questions
    );
    questionRoutes.get(
        '/api/question/:id',
        QuestionController.get_question
    );
    questionRoutes.post(
        '/api/question', 
        [AuthorizationCheck.checkJWT],
        QuestionController.create_question
    );  
    questionRoutes.put(
        '/api/question/:id',
        [AuthorizationCheck.checkJWT],
        QuestionController.update_question
    );
    questionRoutes.delete(
        '/api/question/:id',
        [AuthorizationCheck.checkJWT],
        QuestionController.delete_question
    );

export default questionRoutes;