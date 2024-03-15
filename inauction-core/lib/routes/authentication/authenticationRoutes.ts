import { Application, Router } from 'express';
import { AuthenticationController } from '../../core/controller/authentication/authenticationController';
import {AuthorizationCheck} from "../../middlewares/authorizationCheck";
import {SystemRoles} from "../../core/schema/role";

const authRouters = Router();

// Authenticate - User Login
authRouters.post('/api/auth/login',
    AuthenticationController.authenticate
);

// Authenticate - Bidder Registration
authRouters.post('/api/auth/bidder/register',
    AuthenticationController.bidderRegistration
);

// Authenticate - Bidder Company Registration and Verification
authRouters.post('/api/auth/bidder/company-register',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Bidder]),
        AuthorizationCheck.checkUser
    ],
    AuthenticationController.bidderCompanyRegistration
);


// Authenticate - Bidder Verification
authRouters.post('/api/auth/bidder/verification',
    AuthenticationController.verification
);

// Authenticate - Bidder Verification Resend
authRouters.post('/api/auth/bidder/verification/resend',
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkRole([SystemRoles.Bidder]),
        AuthorizationCheck.checkUser
    ],
    AuthenticationController.verificationResend
);

// Authenticate - User Change Password
authRouters.post("/api/auth/change-password",
    [
        AuthorizationCheck.checkJWT,
        AuthorizationCheck.checkUser
    ],
    AuthenticationController.changePassword
);

// Authenticate - Update User Details
authRouters.post("/api/auth/update-user",
    [
        AuthorizationCheck.checkJWT
    ],
    AuthenticationController.updateUserDetails
);

export default authRouters;


