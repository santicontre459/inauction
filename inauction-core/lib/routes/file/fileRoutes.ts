import { SystemRoles } from '../../core/schema/role';
import { Application, Router } from 'express';
import { FileController } from '../../core/controller/file/fileController';
import { AuthorizationCheck } from '../../middlewares/authorizationCheck';

const fileRoutes = Router();

// File Add
fileRoutes.post('/api/bidder/company/add-file',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Bidder]),
        AuthorizationCheck.checkUser
    ],
    FileController.fileAdd
);


// File Upload
fileRoutes.post('/api/event/add-files',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Host])
    ],
    FileController.uploadFilesForEvent
);

export default fileRoutes;



