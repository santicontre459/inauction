import { InviteBidderControllerHandler } from './inviteBidderControllerHandler';
import { IInviteBidderRepository } from '../../repository/inviteBidder/IInviteBidderRepository';
import { failureResponse, insufficientParameters } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import InviteBidderRepository from '../../repository/inviteBidder/InviteBidderRepository';
import { InviteBidder, InviteBidderResponseStatus, InviteBidderType } from '../../schema/inviteBidder';
import { Request, Response } from 'express';
import { IUserRepository } from "../../repository/user/IUserRepository";
import UserRepository from "../../repository/user/userRepository";
import { User } from "../../schema/user";
import cryptoRandomString from 'crypto-random-string';
import { SendEmail } from "../../../helpers/sendEmail";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

export class InviteBidderController {

    /**
     * Invite Bidder
     * @param req
     * @param res
     */
    public static async inviteBidder(req: Request, res: Response) {

        let inviteBidderRepository: IInviteBidderRepository = new InviteBidderRepository(InviteBidder);
        let bidderRepository: IUserRepository = new UserRepository(User);

        const handler = InviteBidderControllerHandler.checkInviteBidderCreationModel(req);

        if (handler) {

            // check if bidder is already registered with given email
            if (await bidderRepository.checkIfUserExist(handler.email)) {
                failureResponse(ResponseMessages.userAlreadyExist, null, res);
                return false;
            }

            // check if bidder is already invited with given email
            if (await inviteBidderRepository.checkIfUserInvited(handler.email)) {
                failureResponse(ResponseMessages.userAlreadyInvited, null, res);
                return false;
            }

            let inviteBidder: InviteBidder = new InviteBidder();
            inviteBidder.inviter = handler.inviter;
            inviteBidder.company_name = handler.company_name;
            inviteBidder.company_registration_number = handler.company_registration_number;
            inviteBidder.email = handler.email;
            inviteBidder.type = InviteBidderType.IMMEDIATELY;
            inviteBidder.responded_status = InviteBidderResponseStatus.NOT_RESPONDED;

            inviteBidder.createdAt = new Date(Date.now());
            inviteBidder.isDeleted = false;

            let generatedCode = cryptoRandomString({length: 12});
            // just check once if code exists
            inviteBidderRepository.findByCode(generatedCode)
                .then((code: InviteBidder) => {
                    if (code) {
                        generatedCode = cryptoRandomString({length: 12});
                    }
                });
            inviteBidder.code = generatedCode.toUpperCase();

            // send email
            SendEmail.sendBidderInvitationEmail(handler.email, generatedCode.toUpperCase());

            const response = await  inviteBidderRepository.create(inviteBidder);
            res.send({
                message: "Bidder has been invited successfully!",
                data: response
            });
        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Get Bidder Invitations
     * used by: Host
     * @param req
     * @param res
     */
    public static async getInvitations(req: Request, res: Response) {

        let inviteBidderRepository: IInviteBidderRepository = new InviteBidderRepository(InviteBidder);
        // get request user id
        let requestUser = AuthorizationCheck.getCurrentUser(req);

        // define filtering query
        let query = {
            inviter: requestUser,
            isDeleted: false,
        };

        const invitations = await inviteBidderRepository.getAll(query);

        if (invitations.length > 0) {
            res.send(invitations);
        }
        else {
            res.send([]);
        }

    }

    /**
     * Get Bidder Invitations
     * used by: Superadmin
     * @param req
     * @param res
     */
    public static async getBidderInvitationsByHost(req: Request, res: Response) {

        let inviteBidderRepository: IInviteBidderRepository = new InviteBidderRepository(InviteBidder);

        if (req.params.host_id) {

            // define filtering query
            let query = {
                inviter: req.params.host_id,
                isDeleted: false,
            };

            const invitations = await inviteBidderRepository.getAll(query);

            if (invitations.length > 0) {
                res.send(invitations);
            } else {
                res.send([]);
            }
        } else {
            insufficientParameters(res);
        }


    }

}
