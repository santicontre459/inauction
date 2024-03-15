import { SystemRoles } from '../../core/schema/role';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';
import { Application, Router } from 'express';
import { UserController } from '../../core/controller/user/userController';
import {TaskController} from "../../core/controller/task/taskController";
import taskRouters from "../tasks/taskRoutes";
import { EventController } from "../../core/controller/event/eventController";


const systemRouters = Router();

// Retrieve Company Positions - needed for User Creation
// Can be used by anyone, no authentication needed
systemRouters.get('/api/positions', UserController.getPositions);

// Retrieve User Registration Methods - needed for User Creation
// Can be used by Role: Superadmin
systemRouters.get('/api/registration-methods',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    UserController.getRegistrationMethods);

// Retrieve User Registration Types - needed for User Creation
// Can be used by Role: Superadmin
systemRouters.get('/api/registration-types',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    UserController.getRegistrationTypes);

// Retrieve Tasks Names and Types - needed for Tasks Module
// Can be used by either Superadmin, Bidder or Host
taskRouters.get('/api/task-names',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin, SystemRoles.Bidder, SystemRoles.Host])
    ],
    TaskController.get_task_name);

// Retrieve Event Statuses - needed for Event Creation
// Can be used by Role: Superadmin
systemRouters.get('/api/event-status',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Superadmin])
    ],
    EventController.getEventStatuses);

export default systemRouters;
