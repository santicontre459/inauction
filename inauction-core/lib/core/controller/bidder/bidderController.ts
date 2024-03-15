import { BidderControllerHandler } from './bidderControllerHandler';
import UserRepository from '../../repository/user/userRepository';
import CompanyRepository from '../../repository/company/CompanyRepository';
import { User } from '../../schema/user';
import { Request, Response } from 'express';
import { SystemRoles } from '../../schema/role';
import { failureResponse, insufficientParameters } from "../common/handler/responseHandler";
import { ResponseMessages } from "../common/resource/Resource";
import { getManager, getRepository, In } from "typeorm";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { Company } from "../../schema/company";
import { SendEmail } from "../../../helpers/sendEmail";
import { File } from "../../schema/file";
const readFile = require('../../../helpers/readFile');

export class BidderController {


    // get list of bidders
    public static async get_bidders(req: Request, res: Response) {

        let query = BidderControllerHandler.checkBidderRoleParameters(SystemRoles.Bidder);

        let userRepository: UserRepository = new UserRepository(User);
        const bidders = await userRepository.getAll(query);

        if (bidders.length > 0)
            res.status(200).send({ data: bidders });
        else
            res.status(200).send({ data: [] });

    }


    // get list of bidder registration verifications
    public static async get_bidder_verifications(req: Request, res: Response) {

        let query = BidderControllerHandler.checkBidderRoleSubroleParameters(SystemRoles.Bidder, SystemRoles.BidderAdmin);
        let fileRepository = getRepository(File);

        let userRepository: UserRepository = new UserRepository(User);
        const bidders = await userRepository.getAll(query);

        let bidderVerifications = [];
        for (const bidder of bidders) {
            // return only those bidders who have completed second step of registration
            if (bidder.company) {

                let verificationFileFirst;
                let verificationFileSecond;

                await fileRepository.find({ where: { uploadedBy: bidder.id, inauctionType: 0 } })
                    .then((file_data: File[]) => {
                        verificationFileFirst = file_data[0].path;
                        verificationFileSecond = file_data[1].path;
                    })
                    .catch(() => {
                        verificationFileFirst = '';
                        verificationFileSecond = '';
                    });

                await readFile(verificationFileFirst.split("/")[4])
                    .then((res) => {
                        verificationFileFirst = res;
                    }).catch((e) => { verificationFileFirst = '' });

                await readFile(verificationFileSecond.split("/")[4])
                    .then((res) => {
                        verificationFileSecond = res;
                    }).catch((e) => { verificationFileSecond = '' });

                let bidderItem = {
                    bidderId: bidder.id,
                    bidderEmail: bidder.email,
                    companyName: bidder.company.name,
                    companyId: bidder.company.id,
                    bidderCreatedAt: bidder.createdAt,
                    verificationRequested: bidder.company.createdAt,
                    verificationResponded: bidder.company.verificationStatus !== 0 ? bidder.company.modifiedAt : null,
                    verificationStatus: bidder.company.verificationStatus,
                    verificationFileFirst: verificationFileFirst,
                    verificationFileSecond: verificationFileSecond
                };



                bidderVerifications.push(bidderItem);
            }

        }

        if (bidders.length > 0)
            res.status(200).send({ data: bidderVerifications });
        else
            res.status(200).send({ data: [] });

    }


    // change bidder verification status
    public static async change_bidder_verification_status(req: Request, res: Response) {

        let bidderRepository = getRepository(User);
        let companyRepositoryUpdate = new CompanyRepository(User);


        // check request params
        if (!req.body.company_id
            || !req.body.bidder_id
            || (!req.body.current_verification_status && req.body.current_verification_status !== 0)
            || (!req.body.new_verification_status && req.body.new_verification_status !== 0)
        ) {
            insufficientParameters(res);
        }

        // define const
        const companyId = req.body.company_id;
        const bidderId = req.body.bidder_id;
        const currentVerificationStatus = req.body.current_verification_status;
        const newVerificationStatus = req.body.new_verification_status;

        // retrieve bidder
        const bidder_filter = { id: bidderId };

        let combinationBidderCompany;
        let companyRetrieved = new Company();
        let bidderRetrieved = new User();

        // check for bidder_id and company_id combination
        await bidderRepository.findOne({ where: bidder_filter, relations: ['role', 'subrole', 'company'] }).then(bidder => {
            combinationBidderCompany = bidder.company.id === companyId;
            companyRetrieved = bidder.company;
            bidderRetrieved = bidder;

        }).catch(err => {
            combinationBidderCompany = false;

        });

        if (!combinationBidderCompany) {
            failureResponse(ResponseMessages.bidderOrCompanyDoesNotExist, null, res);
            return false;
        }

        // combinations allowed
        // [currentVerificationStatus, newVerificationStatus]
        // [ 0,1 | 0,2 | 0,3 | 2,1 | 2,3 | 3,1 | 3,2 ]

        let statusCombinationsAllowed =
            [
                { current: 0, new: 1 },
                { current: 0, new: 2 },
                { current: 0, new: 3 },
                { current: 2, new: 1 },
                { current: 2, new: 3 },
                { current: 3, new: 1 },
                { current: 3, new: 2 },
            ];

        // check if requested body statuses are allow
        let checkStatusAllowed = statusCombinationsAllowed.filter(function (statusAllowed) {
            return statusAllowed.current === currentVerificationStatus
                && statusAllowed.new === newVerificationStatus;
        });

        if (checkStatusAllowed.length === 0) {
            failureResponse(ResponseMessages.verificationStatusesChangesNotAllow, null, res);
            return false;
        }

        companyRetrieved.verificationStatus = newVerificationStatus;
        companyRetrieved.modifiedAt = new Date(Date.now());
        companyRetrieved.modifiedBy = AuthorizationCheck.getCurrentUser(req);
        companyRetrieved.verificationStatus = newVerificationStatus;
        await companyRepositoryUpdate.updateCompany(companyRetrieved.id, companyRetrieved)
            .then(() => {

                let verificationSubject;
                if (newVerificationStatus === 1) {
                    verificationSubject = 'Account Verified - iNauction Tool'
                }
                else if (newVerificationStatus === 2) {
                    verificationSubject = 'Account Verification Failed - iNauction Tool'
                }
                else {
                    verificationSubject = 'Account Information Request - iNauction tool'
                }


                // Send Email to notify bidder
                SendEmail.sendBidderVerificationStatusEmail(bidderRetrieved.email, newVerificationStatus, verificationSubject);


                res.status(200).send({
                    message: 'Bidder Verification Status changed successfully!',
                });
            })
            .catch(() => {
                res.status(500).send(
                    {
                        message: 'There was an error updating the status. Please try again!'
                    }
                );
            });

        // todo create template email for status changing
        // todo when change status check if .updatedAt has changed

    }


    // get list of category bidders
    public static async get_bidders_category(req: Request, res: Response) {
        let userRepository: UserRepository = new UserRepository(User);
        if (req.params.activity_id) {
            let companies = await getManager().query(
                `
                    SELECT DISTINCT "companyId"
                    FROM "CompanyActivity"
                    where "CompanyActivity"."activityId" = $1
                `,
                [req.params.activity_id]
            );
            let company_ids = [];
            companies.forEach(c => {
                company_ids.push(c.companyId);
            });

            let query = { role: SystemRoles.Bidder, email_verified: true, status: 1, company: In(company_ids) };
            const bidders = await userRepository.getAll(query);

            if (bidders.length > 0)
                res.status(200).send({ data: bidders });
            else
                res.status(200).send({ data: [] });
        }
        else {
            insufficientParameters(res);
        }
    }

}