import { IDraftOnlineAuction } from "../../models/onlineAuction/IOnlineAuction";
import { Response } from 'express';
import { failureResponse } from "../common/handler/responseHandler";
import { ResponseMessages } from "../common/resource/Resource";

export class OnlineAuctionHandler {

    public static async checkDraftOnlineAuctionCreationModel(OARequest: any, res: Response) : Promise<IDraftOnlineAuction | false>   {

        if (
            (OARequest.bid_direction || OARequest.bid_direction === 0)
            && OARequest.start_time
            && (OARequest.competition_info || OARequest.competition_info === 0)
            && OARequest.max_bid_change
            && (OARequest.dynamic_close_period || OARequest.dynamic_close_period === 0)
            && OARequest.min_bid_change
            && OARequest.deadline
            && (OARequest.min_duration || OARequest.min_duration === 0)
            && typeof OARequest.has_questionnaire_in_score === 'boolean'
        ) {
            // check if `bid_direction` is an allowed value
            let bidDirectionAllowed = [0, 1];
            if (!bidDirectionAllowed.includes(OARequest.bid_direction)) {
                failureResponse(ResponseMessages.incorrectBidDirectionType, null, res);
                return false;
            }

            // check if `competition_info` is an allowed value
            let competitionInfoAllowed = [0, 1];
            if (!competitionInfoAllowed.includes(OARequest.competition_info)) {
                failureResponse(ResponseMessages.incorrectCompetitionInfoValue, null, res);
                return false;
            }

            // check if `dynamic_close_period` is an allowed value
            let dynamicClosePeriodAllowed = [0, 1];
            if (!dynamicClosePeriodAllowed.includes(OARequest.dynamic_close_period)) {
                failureResponse(ResponseMessages.incorrectDynamicClosePeriodValue, null, res);
                return false;
            }

            // check if `min_duration` is an allowed value
            let minimumDurationAllowed = [0, 1, 2, 3];
            if (!minimumDurationAllowed.includes(OARequest.min_duration)) {
                failureResponse(ResponseMessages.incorrectMinimumDurationValue, null, res);
                return false;
            }

            return {
                bidDirection: OARequest.bid_direction,
                startTime: new Date(OARequest.start_time),
                competitionInfo: OARequest.competition_info,
                minimumDuration: OARequest.min_duration,
                dynamicClosePeriod: OARequest.dynamic_close_period,
                minimumBidChange: OARequest.min_bid_change,
                maximumBidChange: OARequest.max_bid_change,
                deadline: new Date(OARequest.deadline),
            };
        } else
            return false;
    }
}
