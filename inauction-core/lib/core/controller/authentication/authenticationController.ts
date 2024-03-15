import { User } from '../../schema/user';
import { Verification } from '../../schema/verification';
import { IUserAuthenticatedResponse } from '../../models/authentication/IAuthentication';
import { IUserAuthRequest } from "../../models/authentication/IAuthentication";
import { Request, Response } from 'express';
import {
    errorResponse,
    failureResponse,
    insufficientParameters
} from '../common/handler/responseHandler';
import { PasswordEncryption } from "../common/passwordEncryption/encryption";
import UserRepository from "../../repository/user/userRepository";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { ResponseMessages } from "../common/resource/Resource";
import {IUserRepository} from "../../repository/user/IUserRepository";
import {UserControllerHandler} from "../user/userControllerHandler";
import {Role} from "../../schema/role";
import { SendEmail } from "../../../helpers/sendEmail";
import cryptoRandomString from 'crypto-random-string';
import { IVerificationRepository } from "../../repository/verification/IVerificationRepository";
import VerificationRepository from "../../repository/verification/VerificationRepository";
import { getRepository } from "typeorm";
import { ICompanyRepository } from "../../repository/company/ICompanyRepository";
import CompanyRepository from "../../repository/company/CompanyRepository";
import { Company } from "../../schema/company";
import { CompanyControllerHandler } from "../company/companyControllerHandler";
import { UserPositionEnum } from '../common/enums/UserPositionsEnum';
import { BusinessOperation } from "../../schema/businessOperation";
import { InviteBidder, InviteBidderResponseStatus } from "../../schema/inviteBidder";
import { IInviteBidderRepository } from "../../repository/inviteBidder/IInviteBidderRepository";
import InviteBidderRepository from "../../repository/inviteBidder/InviteBidderRepository";

export class AuthenticationController {

    // Authenticate User
    public static async authenticate(req: Request, res: Response) {
        let userRepository = getRepository(User);
        let userRepositoryUpdate  = new UserRepository(User);
        let companyRepository: ICompanyRepository = new CompanyRepository(Company);

        if (req.body.email && req.body.email) {

            const _userAuthParams: IUserAuthRequest = {
                email: req.body.email,
                password: req.body.password,
                source: req.body.source
            };

            // check if email and password are set (and login source)
            if (!(_userAuthParams.email || _userAuthParams.password || _userAuthParams.source)) {
                insufficientParameters(res);
            }

            // get user from database
            await userRepository.findOne( { where: {email: _userAuthParams.email}, relations: ['role', 'subrole', 'company']})
                .then(async (user_data: User) => {

                    if(user_data) {
                        if (!PasswordEncryption.checkIfUnencryptedPasswordIsValid(_userAuthParams.password, user_data.password)) {
                            res.status(401).send({message: 'Invalid Credentials!' });
                            return;
                        }

                        // USER INACTIVE || USER DELETED
                        if (!user_data.status || user_data.isDeleted) {
                            res.status(404).send({message: 'This user is inactive or has been deleted!' });
                            return;
                        }

                        // When superadmin tries to login at inauction tool portal
                        // if (_userAuthParams.source === 'web' && user_data.role.id === 1) {
                        //     res.status(401).send({message: 'You don\'t have enough permissions to access this tool!' });
                        //     return;
                        // }

                        // When bidder/host tries to login at superadmin
                        if (_userAuthParams.source === 'superadmin' && user_data.role.id !== 1) {
                            res.status(401).send({message: 'You don\'t have enough permissions to access this tool!' });
                            return;
                        }

                        // COMPANY_NOT_ADDED
                        if (!user_data.company) {
                            if (user_data.role.id === 1) {
                                user_data.verification_status = 'VERIFIED'
                            }
                            else {
                                user_data.verification_status = 'COMPANY_NOT_ADDED'
                            }
                        }
                        else {

                            // COMPANY_VERIFICATION_PROCESS
                            if (user_data.company.verificationStatus === 0) {
                                user_data.verification_status = 'COMPANY_VERIFICATION_PROCESS'
                            }
                            // VERIFIED
                            else if (user_data.company.verificationStatus === 1) {
                                user_data.verification_status = 'VERIFIED';
                            }
                            // VERIFICATION_BLOCKED
                            else if (user_data.company.verificationStatus === 2) {
                                res.status(401).send({ message: 'This account is not verified!' });
                                return;
                            }
                            // COMPANY_VERIFICATION_MORE_INFO_NEEDED
                            else if (user_data.company.verificationStatus === 3) {
                                user_data.verification_status = 'COMPANY_VERIFICATION_MORE_INFO_NEEDED';
                            }
                            else {
                                user_data.verification_status = null;
                            }

                            user_data.company = await companyRepository.findById(user_data.company.id);
                        }

                        // EMAIL_NOT_VERIFIED
                        if (!user_data.email_verified) {
                            user_data.verification_status = 'EMAIL_NOT_VERIFIED';
                        }

                        const token =
                            AuthorizationCheck.generateToken(
                                user_data.id,
                                user_data.role.id,
                                user_data.subrole.id,
                                user_data.email
                            );


                        user_data.lastLogin = new Date(Date.now());
                        await userRepositoryUpdate.updateUser(user_data.id, user_data);


                        const response: IUserAuthenticatedResponse = {
                            token: token,
                            data: user_data
                        };

                        res.send(response);

                    }
                    else {
                        failureResponse(ResponseMessages.userDoesNotExist, null, res);
                    }

                }).catch(err => {
                    errorResponse(err, res);
                });

        } else {
            insufficientParameters(res);
        }
    };

    // Bidder Registration
    public static async bidderRegistration(req: Request, res: Response) {

        let bidderRepository: IUserRepository = new UserRepository(User);
        let verificationRepository: IVerificationRepository = new VerificationRepository(Verification);
        let inviteBidderRepository: IInviteBidderRepository = new InviteBidderRepository(InviteBidder);
        const handler = await UserControllerHandler.checkBidderCreationModel(req);

        if (handler) {

            let role = new Role();
            let subRole = new Role();

            // check if role exists
            if (handler.roleId) {
                role = handler.roleId;
            } else {
                failureResponse(ResponseMessages.roleDoesNotExist, null, res);
            }

            // check if sub role exists
            if (handler.subroleId) {
                subRole = handler.subroleId;
            } else {
                failureResponse(ResponseMessages.subRoleDoesNotExist, null, res);
            }


            // check if bidder is already registered with given email
            if (await bidderRepository.checkIfUserExist(handler.email)) {
                failureResponse(ResponseMessages.userAlreadyExist, null, res);
                return false;
            }

            try {

                // bidder create
                let bidderEntity: User = new User();
                bidderEntity.firstName = handler.firstName;
                bidderEntity.lastName = handler.lastName;
                bidderEntity.password = PasswordEncryption.hashPassword(req.body.password);
                bidderEntity.role = role;
                bidderEntity.subrole = subRole;
                bidderEntity.email = handler.email;
                bidderEntity.status = handler.status;
                bidderEntity.email_verified = handler.email_verified;
                bidderEntity.verification_status = handler.verification_status;
                bidderEntity.phoneNumber = handler.phoneNumber;
                bidderEntity.registrationMethod = handler.registrationMethod;
                bidderEntity.registrationType = handler.registrationType;
                bidderEntity.firstLogin = new Date(Date.now());
                bidderEntity.lastLogin = handler.firstLogin;
                bidderEntity.company = null;
                bidderEntity.position = handler.position;
                bidderEntity.createdAt = new Date(Date.now());
                bidderEntity.modifiedAt = new Date(Date.now());

                const userResponse = await bidderRepository.create(bidderEntity);

                // create a random string/token needed for user email verification
                try {

                    let verificationEntity: Verification = new Verification();
                    verificationEntity.user = userResponse;
                    verificationEntity.token = cryptoRandomString({length: 64});
                    verificationEntity.expiration = 60;
                    verificationEntity.createdAt = new Date(Date.now());
                    verificationEntity.modifiedAt = new Date(Date.now());

                    // just check once if token exists
                    verificationRepository.findByToken(verificationEntity.token)
                        .then((verification_token: Verification) => {
                            if (verification_token) {
                                verificationEntity.token = cryptoRandomString({length: 64});
                            }
                        });

                    const verificationResponse = await verificationRepository.create(verificationEntity);

                    // on token create success send verification email to bidder including token
                    const verificationCode = verificationResponse.token;

                    // send email
                    SendEmail.sendBidderVerificationEmail(handler.email, verificationCode);

                    userResponse.verification_status = 'EMAIL_NOT_VERIFIED';

                    const token =
                        AuthorizationCheck.generateToken(userResponse.id, userResponse.role.id, userResponse.subrole.id, userResponse.email);

                    // check if it is invited
                    if (req.body.invitation_code) {
                        inviteBidderRepository.findByCode(req.body.invitation_code)
                            .then(async (invitedBidder: InviteBidder) => {

                                if (invitedBidder) {
                                    invitedBidder.responded_status = InviteBidderResponseStatus.ACCEPTED;
                                    invitedBidder.responded_date = new Date(Date.now());
                                    invitedBidder.modifiedBy = userResponse.id;
                                    invitedBidder.modifiedAt = new Date(Date.now());
                                    if(req.body.email === invitedBidder.email) {
                                        await inviteBidderRepository.update(invitedBidder.id, invitedBidder);
                                    }
                                }

                            });
                    }
                    const response: IUserAuthenticatedResponse = {
                        token: token,
                        data: userResponse
                    };

                    // send response
                    res.send(response);
                }
                catch (err) {
                    errorResponse(err, res);
                }

            } catch (err) {
                errorResponse(err, res);
            }


        } else {
            insufficientParameters(res);
        }

    };

    // Bidder Registration Step 2
    public static async bidderCompanyRegistration(req: Request, res: Response) {

        let companyRepository: ICompanyRepository = new CompanyRepository(Company);
        let businessOperationRepository  = getRepository(BusinessOperation);
        let bidderRepository  = getRepository(User);
        let bidderRepositoryUpdate  = new UserRepository(User);
        const handler = await CompanyControllerHandler.checkCompanyCreationModel(req);

        if (handler) {

            let bidder = new User();
            let businessOperation = new BusinessOperation();

            await businessOperationRepository.findOne({ where: {id: req.body.business_operation_id }})
                .then((business_operation_data: BusinessOperation) => {
                    // if business_operation_data inactive or deleted  company should not be created
                    if (business_operation_data.status === 0 || business_operation_data.isDeleted === true) {
                        businessOperation = null;
                    }
                    else {
                        businessOperation = business_operation_data;
                    }
                }).catch(() => { businessOperation = null; });

            // check if business operation exists
            if (!businessOperation) {
                failureResponse(ResponseMessages.businessOperationDoesNotExist, null, res);
                return false;
            }

            // retrieve bidder
            const bidder_filter = { id: req.body.user_id };

            // Get bidder from the database based on the id provided
            await bidderRepository.findOne( { where: bidder_filter, relations: ['role', 'subrole', 'company']})
                .then( (user_data: User) => {
                    // if bidder inactive or not verified yet company should not be created
                    if (user_data.status === 0 || user_data.email_verified === false || user_data.isDeleted === true) {
                        bidder = null;
                    }
                    else {
                        bidder = user_data;
                    }

                })
                .catch(() => { bidder = null; });

            // check if company is already registered with a given business registration umber
            if (await companyRepository.checkIfCompanyExist(handler.businessRegNumber)) {
                failureResponse(ResponseMessages.companyAlreadyExist, null, res);
                return false;
            }

            let jobPosition = UserPositionEnum[req.body.position];

            // check if bidder exists
            if (!bidder) {
                failureResponse(ResponseMessages.bidderDoesNotExist, null, res);
                return false;
            }

            // check if job position exists
            if (!jobPosition) {
                failureResponse(ResponseMessages.jobPositionDoesNotExist, null, res);
                return false;
            }

            try {

                // company create
                let companyEntity: Company = new Company();
                companyEntity.name = handler.name;
                companyEntity.businessRegNumber = handler.businessRegNumber;
                companyEntity.legalRepresentativeName = handler.legalRepresentativeName;
                companyEntity.legalRepresentativeSurname = handler.legalRepresentativeSurname;
                companyEntity.verificationStatus = handler.verificationStatus;
                companyEntity.businessOperation = businessOperation;
                companyEntity.modifiedBy = bidder.id;
                companyEntity.createdAt = new Date(Date.now());
                companyEntity.modifiedAt = new Date(Date.now());
                companyEntity.address = handler.address;

                const companyResponse = await companyRepository.create(companyEntity);

                // create a random string/token needed for user email verification
                try {
                    bidder.company = companyResponse;
                    bidder.position = req.body.position;
                    bidder.verification_status = 'COMPANY_VERIFICATION_PROCESS';

                    bidderRepositoryUpdate.updateBidder(bidder.id, bidder)
                        .then(() => {

                            const token =
                                AuthorizationCheck.generateToken(
                                    bidder.id,
                                    bidder.role.id,
                                    bidder.subrole.id,
                                    bidder.email);

                            res.status(200).send({
                                message: 'Company has been created successfully!',
                                token: token,
                                data: bidder
                            });
                        })
                        .catch(() => {
                            res.status(500).send(
                                {
                                    message: 'There was an error creating the company. Please contact iNegotio Support at support@inegotio.com!'
                                }
                            );
                        })
                }
                catch (err) {
                    errorResponse(err, res);
                }

            } catch (err) {
                errorResponse(err, res);
            }


        } else {
            insufficientParameters(res);
        }

    }

    /**
     * Email verification Resend
     * Params: user_id
     * @param req
     * @param res
     */
    public static async verificationResend(req: Request, res: Response) {
        let bidderRepository  = getRepository(User);
        let verificationRepository: IVerificationRepository = new VerificationRepository(Verification);
        let verificationRepositoryUpdate  = new VerificationRepository(Verification);

        if (!req.body.user_id) {
            insufficientParameters(res);
        }

        const user_filter = { id: req.body.user_id };

        // Get bidder from the database
        await bidderRepository.findOne( { where: user_filter, relations: ['role', 'subrole', 'company']})
            .then( (user_data: User) => {
                if (user_data.status === 0 || user_data.isDeleted === true) {
                    res.status(404).send({ message: 'This user is inactive or has been deleted!' });
                }
                else if (user_data.email_verified) {
                    return res.status(202).send({ message: 'Email Already Verified!'});
                } else {
                    verificationRepository.findByUserId(req.body.user_id)
                        .then((verification_data: Verification) => {

                            // delete the existing active token
                            verification_data.isDeleted = true;
                            verificationRepositoryUpdate.update(verification_data.id, verification_data)
                                .then(async () => {

                                    let verificationEntity: Verification = new Verification();
                                    verificationEntity.user = user_data;
                                    verificationEntity.token = cryptoRandomString({length: 64});
                                    verificationEntity.expiration = 60;
                                    verificationEntity.createdAt = new Date(Date.now());
                                    verificationEntity.modifiedAt = new Date(Date.now());

                                    // just check once if token exists
                                    verificationRepository.findByToken(verificationEntity.token)
                                        .then((verification_token: Verification) => {
                                            if (verification_token) {
                                                verificationEntity.token = cryptoRandomString({length: 64});
                                            }
                                        });

                                    const verificationResponse = await verificationRepository.create(verificationEntity);

                                    // on token create success send verification email to bidder including token
                                    const verificationCode = verificationResponse.token;

                                    console.log('verificationCode==========================')
                                    console.log(verificationCode)
                                    // send email
                                    SendEmail.sendBidderVerificationEmail(user_data.email, verificationCode);

                                    res.status(200).send({
                                        message: 'Verification email has been resend successfully!',
                                    });
                                })
                                .catch(() => { res.status(400).send({ message: 'Problem in resending the verification email!' }); })

                        })
                        .catch(() => { res.status(404).send({ message: 'User not found!' }); })
                }
            })
            .catch(() => {
                res.status(404).send({ message: 'Email Not Found!' });
            })
    }

    /**
     * Email verification for Bidders
     * Params: email & token
     * @param req
     * @param res
     */
    public static async verification(req: Request, res: Response) {

        let bidderRepository  = getRepository(User);
        let bidderRepositoryUpdate  = new UserRepository(User);
        let verificationRepository: IVerificationRepository = new VerificationRepository(Verification);

        if (!req.body.email && !req.body.token) {
            insufficientParameters(res);
        }

        const user_filter = { email: req.body.email };

        // Get bidder from the database
        await bidderRepository.findOne( { where: user_filter, relations: ['role', 'subrole', 'company']})
            .then( (user_data: User) => {
                if (user_data.status === 0 || user_data.isDeleted === true) {
                    res.status(404).send({ message: 'This user is inactive or has been deleted!' });
                }
                else if (user_data.email_verified) {
                    return res.status(202).send({ message: 'Email Already Verified!'});
                } else {
                    verificationRepository.findByToken(req.body.token)
                        .then((verification_data: Verification) => {

                            // to check expiration logic here
                            const now = new Date(Date.now());
                            const tokenCreationDate = new Date(verification_data.createdAt);
                            const tokenExpirationDate = new Date(tokenCreationDate.getTime() + verification_data.expiration*60000);

                            // if token exists and it is not expired
                            if (verification_data && tokenExpirationDate.getTime() > now.getTime()) {
                                user_data.email_verified = true;
                                user_data.verification_status = 'COMPANY_NOT_ADDED';
                                bidderRepositoryUpdate.updateBidder(user_data.id, user_data)
                                    .then(() => {

                                        const token =
                                            AuthorizationCheck.generateToken(
                                                user_data.id,
                                                user_data.role.id,
                                                user_data.subrole.id,
                                                user_data.email);

                                        res.status(200).send({
                                            message: 'Bidder has been verified successfully!',
                                            token: token,
                                            data: user_data
                                        });
                                    })
                                    .catch(() => { res.status(400).send({ message: 'Verification Failed!' }); })
                            } else { res.status(404).send({ message: 'Token Expired!' }); }
                        })
                        .catch(() => { res.status(404).send({ message: 'Token Expired!' }); })
                }
            })
            .catch(() => {
                res.status(404).send({ message: 'Email Not Found!' });
            })
    }

    // Change User Password
    public static async changePassword(req: Request, res: Response) {
        let userRepository  = new UserRepository(User);
        let userRepositoryUpdate  = new UserRepository(User);

        const handler = await UserControllerHandler.checkChangePasswordHandler(req);

        if (handler) {

            // Get parameters from the body
            const oldPassword  = req.body.old_password;
            const newPassword  = req.body.new_password;
            const userId  = req.body.user_id;

            // Get user from the database
            await userRepository.findById(userId)
                .then(async (user_data: User) => {

                    // Check if old password matches
                    if (!PasswordEncryption.checkIfUnencryptedPasswordIsValid(oldPassword, user_data.password.toString())) {
                        res.status(400).send({ message: 'Old password doesn\'t match!' });
                        return;
                    }

                    // check basic password strength
                    if (newPassword.length < 8) {
                        res.status(400).send({ message: 'New password should have at least 8 characters!' });
                        return;
                    }

                    // check user status and deletion status
                    if (user_data.status === 0 || user_data.isDeleted === true) {
                        res.status(400).send({ message: 'Inactive or deleted users are not allowed to do this operation!' });
                        return;
                    }

                    // Hash the new password and save
                    user_data.password = PasswordEncryption.hashPassword(newPassword);
                    user_data.modifiedBy = AuthorizationCheck.getCurrentUser(req);
                    user_data.modifiedAt = new Date(Date.now());

                    await userRepositoryUpdate.updateUser(user_data.id, user_data);

                    const token =
                        AuthorizationCheck.generateToken(
                            user_data.id,
                            user_data.role.id,
                            user_data.subrole.id,
                            user_data.email
                        );

                    const response: IUserAuthenticatedResponse = {
                        token: token,
                        data: user_data
                    };

                    res.send(response);

                })
                .catch(() => {
                    res.status(401).send();
                })


        } else {
            insufficientParameters(res);
        }

    }

    // Change User Password
    public static async updateUserDetails(req: Request, res: Response) {
        let userRepository  = new UserRepository(User)
        let companyRepository: ICompanyRepository = new CompanyRepository(Company);
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        let user = await userRepository.findById(requestUser);

        console.log('========================================================================')
        console.log(req.body)
        if (user) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;

            user = await userRepository.updateUser(user.id, user);
            user.company = await companyRepository.findById(user.company.id);
            res.send({
                data: user
            });
        }
        else {
            res.status(401).send();
        }
    }
}