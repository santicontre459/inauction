import { BidDirection } from "../../schema/common/audit/baseEntity";
import { Event } from "../../schema/event";
import { Questionnaire } from "../../schema/questionnaire";

export interface IDraftIRFQ {
    id?: String;
    event?: Event;
    bidDirection: BidDirection;
    bidDeadline: Date;
    sealResultType: Boolean;
    weighting?: Number;
    questionnaire?: Questionnaire;
}
