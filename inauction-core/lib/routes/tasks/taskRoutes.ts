import { TaskController } from '../../core/controller/task/taskController';
import { SystemRoles } from '../../core/schema/role';
import { Router } from 'express';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';

const taskRouters = Router();

/** Retrieve tasks by customer (Host || Bidder) */
taskRouters.get(
'/api/task/:customer_id/active',  [
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
], TaskController.getTasksByCustomer);


/** Retrieve tasks by customer (Host || Bidder) */
taskRouters.get(
    '/api/task/:customer_id/deleted',  [
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Superadmin])
], TaskController.getDeletedTasksByCustomer);

/** Retrieve a task details */
taskRouters.get('/api/task/details/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([
        SystemRoles.HostAdmin,
        SystemRoles.BidderAdmin,
        SystemRoles.BidderExpert,
        SystemRoles.HostExpert,
    ])
], TaskController.getTask);


/** Get Tasks of specific customer */
taskRouters.get('/api/task',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([
        SystemRoles.HostAdmin,
        SystemRoles.BidderAdmin,
        SystemRoles.BidderExpert,
        SystemRoles.HostExpert
    ])
], TaskController.getTasks);


/** Task can be created only by Admins of Respectively Host or Bidder */
taskRouters.post('/api/task',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], TaskController.create);

/** Update task **/
taskRouters.put('/api/task/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], TaskController.update);

/** Change compilation Status of a task  **/
taskRouters.patch('/api/task/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([
        SystemRoles.HostAdmin,
        SystemRoles.BidderAdmin,
        SystemRoles.BidderExpert,
        SystemRoles.HostExpert,
    ])
], TaskController.changeCompilationStatus);

/** Delete A Task **/
taskRouters.delete('/api/task/:id',
    [
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([SystemRoles.HostAdmin, SystemRoles.BidderAdmin])
], TaskController.delete);

/** Task note can be created by task report or task owner */
taskRouters.post('/api/task/note',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([
        SystemRoles.HostAdmin,
        SystemRoles.BidderAdmin,
        SystemRoles.BidderExpert,
        SystemRoles.HostExpert,
    ])
], TaskController.addNote);

/** Get Notes by Task */
taskRouters.get('/api/task/note/:task_id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([
        SystemRoles.HostAdmin,
        SystemRoles.BidderAdmin,
        SystemRoles.BidderExpert,
        SystemRoles.HostExpert,
    ])
], TaskController.getNotes);


/** Update task note **/
taskRouters.put('/api/task/note/:id',
[
    AuthorizationCheck.checkJWT,
    AuthorizationCheck.checkRole([SystemRoles.Host, SystemRoles.Bidder]),
    AuthorizationCheck.checkSubRole([
        SystemRoles.HostAdmin,
        SystemRoles.BidderAdmin,
        SystemRoles.BidderExpert,
        SystemRoles.HostExpert,
    ])
], TaskController.updateNote);


export default taskRouters;



