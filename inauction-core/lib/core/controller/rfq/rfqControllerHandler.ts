import { IDraftIRFQ } from "core/models/rfq/IRFQ";
import { Response } from 'express';
import { failureResponse} from "../common/handler/responseHandler";
import { ResponseMessages } from "../common/resource/Resource";

export class RFQControllerHandler {

    public static async checkDraftRFQCreationModel(rfqRequest: any, res: Response) : Promise<IDraftIRFQ | false>   {

        if (
            (rfqRequest.bid_direction || rfqRequest.bid_direction === 0)
            && rfqRequest.bid_deadline
            && typeof rfqRequest.seal_result_type === 'boolean'
            && typeof rfqRequest.has_questionnaire_in_score === 'boolean'
        ) {

            // check if `bid_direction` is an allowed value
            let bidDirectionAllowed = [0, 1];
            if (!bidDirectionAllowed.includes(rfqRequest.bid_direction)) {
                failureResponse(ResponseMessages.incorrectBidDirectionType, null, res);
                return false;
            }

            return {
                bidDirection: rfqRequest.bid_direction,
                bidDeadline: new Date(rfqRequest.bid_deadline),
                sealResultType: rfqRequest.seal_result_type,
            };
        } else
            return false;
    }
}
