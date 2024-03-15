import {Entity, Column} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("BusinessOperation")
export class BusinessOperation extends BaseEntity {

    @Column()
    name: string;

    @Column()
    status: BusinessOperationStatus;

}

export enum BusinessOperationStatus {
    INACTIVE,
    ACTIVE
}