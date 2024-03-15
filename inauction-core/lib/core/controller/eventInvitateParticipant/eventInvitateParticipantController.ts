import { getManager, getRepository } from "typeorm";
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';

import { EventInvitateParticipantControllerHandler } from './eventInvitateParticipantControllerHandler';
import { EventParticipant } from '../../schema/eventParticipant';
import { InvitationMethod, InvitationStatus } from "../../schema/eventParticipant";
import { IEventParticipantRepository } from '../../repository/eventParticipant/IEventParticipantRepository';
import EventParticipantRepository from '../../repository/eventParticipant/EventParticipantRepository';
// import { ICompanyRepository } from "../../repository/company/ICompanyRepository";
// import CompanyRepository from "../../repository/company/CompanyRepository";
import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';
import { EventInvitation } from "../../schema/eventInvitation";
import { InviteBidder, InviteBidderResponseStatus } from "../../schema/inviteBidder";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

import { IUserRepository } from "../../repository/user/IUserRepository";
import UserRepository from "../../repository/user/userRepository";
import { User, UserPosition } from "../../schema/user";
import { EventProgressStatus } from "../../schema/event";
import { AppNotification, NotificationType } from '../../schema/appNotification';
import { Name } from '../../schema/file';

export class EventInviteParticipantController {

    public static async get_eventParticipants(req: Request, res: Response) {
        let eventParticipantRepository: IEventParticipantRepository = new EventParticipantRepository(EventParticipant);
        if (req.params.eventid) {
            const event_filter = { eventid: req.params.eventid };
            await eventParticipantRepository.filterEventParticipant(event_filter).then(data => {
                if (data) {
                    return res.send(data);
                } else {
                    return failureResponse(ResponseMessages.eventParticipantsDoNotExist, null, res);
                }
            }).catch(err => {
                errorResponse(err, res);
            });
        } else {
            insufficientParameters(res);
        }
    }

    public static async create_eventInvitedParticipants(req: Request, res: Response) {
        return await getManager().transaction(async transactionalEntityManager => {
            let eventRepository: IEventRepository = transactionalEntityManager.getCustomRepository(EventRepository)
            // let companyRepository: ICompanyRepository = transactionalEntityManager.getCustomRepository(CompanyRepository)
            let userRepository: IUserRepository = transactionalEntityManager.getCustomRepository(UserRepository)
            const timestamp: Date = new Date(Date.now());

            let event = await eventRepository.findById(req.body.eventid);
            if (!event) {
                throw failureResponse(ResponseMessages.eventDoesNotExist, null, res);
            }
            const user = AuthorizationCheck.getCurrentUser(req);
            const userData = await userRepository.findById(user);
            if (!user || !userData) {
                throw failureResponse(ResponseMessages.userDoesNotExist, null, res);
            }


            // checkBidder
            const handler = EventInvitateParticipantControllerHandler.checkEventInvitationCreationModel(req);
            if (handler) {

                let eventInvitation: EventInvitation = new EventInvitation();
                eventInvitation.event = event;
                // TODO: user
                eventInvitation.inviter = userData;
                eventInvitation.host = userData;
                eventInvitation.notification_type = handler.notification_type;

                eventInvitation.createdAt = timestamp;
                eventInvitation.modifiedAt = timestamp;
                eventInvitation.isDeleted = false;
                eventInvitation.modifiedBy = user;
                await transactionalEntityManager.save(eventInvitation);

                handler.bidders.forEach(async bidder => {
                    const bidderHandler = EventInvitateParticipantControllerHandler.checkBidder(bidder);

                    if (bidderHandler) {
                        const participant = await userRepository.findById(bidderHandler.userid);
                        if (!participant) {
                            throw failureResponse(ResponseMessages.participantDoesNotExist, null, res);
                        }
                        let eventParticipant: EventParticipant = new EventParticipant();
                        eventParticipant.event = event;
                        eventParticipant.eventInvitation = eventInvitation;
                        eventParticipant.participant = participant;
                        eventParticipant.email = bidderHandler.email;
                        eventParticipant.invitation_method = bidderHandler.invitation_method;
                        eventParticipant.invitation_status = bidderHandler.invitation_status;

                        eventParticipant.createdAt = timestamp;
                        eventParticipant.modifiedAt = timestamp;
                        eventParticipant.isDeleted = false;
                        eventParticipant.modifiedBy = user;
                        transactionalEntityManager.save(eventParticipant);

                        // show notification to bidder
                        let notification: AppNotification = new AppNotification();
                        notification.notification_type = NotificationType.INVITATION_EVENT;
                        notification.data_id = event.id;
                        notification.title = `Event Invitation`;
                        notification.message = `${userData.firstName} ${userData.lastName} has sent you a invitation to event`;
                        notification.user = participant;
                        notification.read = false;
                        notification.createdAt = timestamp;
                        notification.modifiedAt = timestamp;
                        notification.isDeleted = false;
                        notification.modifiedBy = user;
                        transactionalEntityManager.save(notification);

                    } else {
                        console.log('dddddddddddddd');
                        throw insufficientParameters(res);
                    }
                });

                handler.eventCategories.forEach(async eventCategory => {
                    const eventCategoriesHandler = EventInvitateParticipantControllerHandler.checkEventCategories(eventCategory);

                    if (eventCategoriesHandler) {
                        // const company = await companyRepository.findById(eventCategoriesHandler.companyid);
                        // if(!company){
                        //     throw failureResponse(ResponseMessages.companyDoesNotExist, null, res);
                        // }
                        const participant = await userRepository.findById(eventCategoriesHandler.userid);
                        if (!participant) {
                            throw failureResponse(ResponseMessages.participantDoesNotExist, null, res);
                        }
                        let eventParticipant: EventParticipant = new EventParticipant();
                        eventParticipant.event = event;
                        eventParticipant.eventInvitation = eventInvitation;
                        eventParticipant.participant = participant;
                        eventParticipant.email = eventCategoriesHandler.email;
                        eventParticipant.invitation_method = eventCategoriesHandler.invitation_method;
                        eventParticipant.invitation_status = eventCategoriesHandler.invitation_status;

                        eventParticipant.createdAt = timestamp;
                        eventParticipant.modifiedAt = timestamp;
                        eventParticipant.isDeleted = false;
                        eventParticipant.modifiedBy = user;
                        transactionalEntityManager.save(eventParticipant);

                        // show notification to bidder
                        let notification: AppNotification = new AppNotification();
                        notification.notification_type = NotificationType.INVITATION_EVENT;
                        notification.data_id = event.id;
                        notification.title = `Event Invitation`;
                        notification.message = `${userData.firstName} ${userData.lastName} has sent you a invitation to event`;
                        notification.user = participant;
                        notification.read = false;
                        notification.createdAt = timestamp;
                        notification.modifiedAt = timestamp;
                        notification.isDeleted = false;
                        notification.modifiedBy = user;
                        transactionalEntityManager.save(notification);
                    }
                });

                handler.emailInvitations.forEach(async emailInvitation => {
                    const email = EventInvitateParticipantControllerHandler.checkEmail(emailInvitation);
                    if (email) {
                        let eventParticipant: EventParticipant = new EventParticipant();
                        eventParticipant.event = event;
                        eventParticipant.eventInvitation = eventInvitation;
                        eventParticipant.email = email;
                        eventParticipant.invitation_method = InvitationMethod.EMAIL;
                        eventParticipant.invitation_status = InvitationStatus.PENDING;

                        eventParticipant.createdAt = timestamp;
                        eventParticipant.modifiedAt = timestamp;
                        eventParticipant.isDeleted = false;
                        eventParticipant.modifiedBy = user;
                        transactionalEntityManager.save(eventParticipant);
                    } else {
                        throw failureResponse(ResponseMessages.emailWrongFormat, null, res);
                    }
                });

                if (user.position === UserPosition.Chief_Executive_Officer) {
                    event.progressStatus = EventProgressStatus.READY_TO_PUBLISH;
                } else {
                    event.progressStatus = EventProgressStatus.WAITING_REVIEW;
                }
                event.progressStatus = EventProgressStatus.READY_TO_PUBLISH;
                event = await eventRepository.updateEvent(event.id, event);
                return res.send({ data: event });
            } else {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
                throw insufficientParameters(res);
            }
        })
    }
}
