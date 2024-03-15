import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { BaseEntity, BidDirection } from "./common/audit/baseEntity";
import { Event } from "./event";
import { Questionnaire } from "./questionnaire";

@Entity("OnlineAuction")
export class OnlineAuction extends BaseEntity {

    @ManyToOne(() => Event, event => event.id)
    event: Event;

    @Column()
    bidDirection: BidDirection;

    @Column()
    startTime: Date;

    @Column()
    deadline: Date;

    @Column()
    competitionInfo: CompetitionInfo;

    @Column()
    minimumDuration: MinimumDuration;

    @Column()
    dynamicClosePeriod: DynamicClosePeriod;

    // in %
    @Column()
    minimumBidChange: string;

    // in %
    @Column()
    maximumBidChange: string;

    @Column({ nullable:true })
    weighting: Number;

    @ManyToOne(() => Questionnaire, questionnaire => questionnaire.id,
        { nullable:true })
    questionnaire: Questionnaire;
}

export enum CompetitionInfo {
    RANKING,
    BEST_BID
}

export enum DynamicClosePeriod {
    NONE,
    LAST_MINUTE
}

export enum MinimumDuration {
    TEN_MINUTES,
    THIRTY_MINUTES,
    ONE_HOURS,
    TWO_HOURS
}
