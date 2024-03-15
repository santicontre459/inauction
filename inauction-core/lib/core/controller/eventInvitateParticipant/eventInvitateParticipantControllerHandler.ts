import { Request, Response } from 'express';
import { IEventInvitationCreateEvent } from "../../models/eventInvitation/IEventInvitation";
import { IBidder } from "../../models/eventParticipant/IEventParticipant";
import { NotificationType } from "../../schema/eventInvitation";
import { InvitationMethod, InvitationStatus } from "../../schema/eventParticipant";

export class EventInvitateParticipantControllerHandler {

    public static checkEventInvitationCreationModel(req: Request) : IEventInvitationCreateEvent | false {
        if (  req.body.eventid
            && Array.isArray(req.body.bidders)
            && Array.isArray(req.body.emailInvitations)
            && Array.isArray(req.body.eventCategories)
        ) {
            const inviteBidder : IEventInvitationCreateEvent = {
                eventid:req.body.eventid,
                bidders: req.body.bidders,
                emailInvitations: req.body.emailInvitations,
                eventCategories: req.body.eventCategories,
                notification_type: NotificationType.NOTIFICATION_EMAIL
            };
            return inviteBidder;
        } else
            return false;
    }

    public static checkBidder(body: any) : IBidder | false {
        if (  body.userid
            // && body.companyid
            && body.email
        ) {
            const bidder : IBidder = {
                userid: body.userid,
                // companyid: body.companyid,
                email: body.email,
                invitation_method: InvitationMethod.BIDDERS_DATABASE,
                invitation_status: InvitationStatus.PENDING
            };
            return bidder;
        } else
            return false;
    }     
    
    public static checkEventCategories(body: any) : IBidder | false {
        if ( body.userid
            // && body.companyid
            && body.email
        ) {
            const bidder : IBidder = {
                userid: body.userid,
                // companyid: body.companyid,
                email: body.email,
                invitation_method: InvitationMethod.EVENT_CATEGORY,
                invitation_status: InvitationStatus.PENDING
            };
            return bidder;
        } else
            return false;
    } 

    public static checkEmail(email: any) : String | false {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) && email;
    }

}
