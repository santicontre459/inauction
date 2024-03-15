import { failureResponse, insufficientParameters } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { IUserRepository } from "../../repository/user/IUserRepository";
import UserRepository from "../../repository/user/userRepository";
import { User } from "../../schema/user";
import cryptoRandomString from 'crypto-random-string';
import { SendEmail } from "../../../helpers/sendEmail";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { AppNotification } from '../../schema/appNotification';
import { getManager, getRepository } from 'typeorm';

export class AppNotificationsController {

    /**
     * @param req
     * @param res
     */
    public static async setReadNotification(req: Request, res: Response) {
        let repository = getRepository(AppNotification);
        let userRepository = getRepository(User);
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        const userData = await userRepository.findOne(requestUser);
        if (!userData) {
            return failureResponse(ResponseMessages.userDoesNotExist, null, res);
        }

        if (req.body.noti_id) {
            let noti: AppNotification = await repository.findOne(req.body.noti_id);
            console.log('=================================================== ', noti)
            if (noti) {
                noti.read = true;
                await repository.save(noti);
            }
        }
        else {
            await getManager().transaction(async transactionalEntityManager => {
                let notifications = await repository.find({ where: { user: userData, read: false } });
                notifications.forEach(async noti => {
                    noti.read = true;
                    await transactionalEntityManager.save(noti);
                });
            })
        }

        res.send('success');
    }


    /**
     * Get app notifications
     * @param req
     * @param res
     */
    public static async getAppNotifications(req: Request, res: Response) {
        let repository = getRepository(AppNotification);
        let userRepository = getRepository(User);
        let requestUser = AuthorizationCheck.getCurrentUser(req);
        const userData = await userRepository.findOne(requestUser);
        if (!userData) {
            return failureResponse(ResponseMessages.userDoesNotExist, null, res);
        }
        const notifications = await repository.find({ where: { user: userData }, order: {createdAt: 'DESC'} });

        if (notifications.length > 0) {
            res.send(notifications);
        } else {
            res.send([]);
        }
    }

}
