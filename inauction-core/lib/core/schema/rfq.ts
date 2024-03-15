import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { BaseEntity, BidDirection } from "./common/audit/baseEntity";
import { Event } from "./event";
import {Questionnaire} from "./questionnaire";

@Entity("Rfq")
export class Rfq extends BaseEntity {

    @ManyToOne(() => Event, event => event.id)
    event: Event;

    @Column()
    bidDirection: BidDirection;

    @Column()
    bidDeadline: Date;

    @Column()
    sealResultType: Boolean;

    @Column({ nullable:true })
    weighting: Number;

    @ManyToOne(() => Questionnaire, questionnaire => questionnaire.id,
        { nullable:true })
    questionnaire: Questionnaire;
}
