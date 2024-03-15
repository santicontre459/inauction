import { IInviteBidder } from "core/models/inviteBidder/IInviteBidder";
import { Request } from 'express';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

export class InviteBidderControllerHandler {

    public static checkInviteBidderCreationModel(req: Request) : IInviteBidder | false   {

        // get request user id in order to determine task creator
        const requestUser = AuthorizationCheck.getCurrentUser(req);

        if (req.body.company_name
            && req.body.company_registration_number
            && req.body.email
        ) {
            return {
                inviter: requestUser,
                code: null,
                company_name: req.body.company_name,
                company_registration_number: req.body.company_registration_number,
                email: req.body.email
            };
        } else
            return false;
    }
}
