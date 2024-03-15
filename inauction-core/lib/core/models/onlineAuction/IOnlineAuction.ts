import { DynamicClosePeriod, CompetitionInfo, MinimumDuration } from "../../schema/onlineAuction"
import { BidDirection } from "../../schema/common/audit/baseEntity";
import { Event } from "../../schema/event";
import { Questionnaire} from "../../schema/questionnaire";

export interface IDraftOnlineAuction {
    id?: String;
    event?: Event;
    bidDirection: BidDirection;
    startTime: Date;
    competitionInfo: CompetitionInfo;
    minimumDuration: MinimumDuration;
    dynamicClosePeriod: DynamicClosePeriod;
    minimumBidChange: string;
    maximumBidChange: string;
    weighting?: Number;
    deadline: Date;
    questionnaire?: Questionnaire;
}
