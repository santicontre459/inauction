import {Entity, Column} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("Address")
export class Address extends BaseEntity {

    @Column({default: 'Albania'})
    country: string;

    @Column({default: 'Tirane'})
    state: string;

    @Column({default: 'Tirane'})
    city: string;

    @Column()
    address: string;

    @Column({nullable:true})
    addressDetail: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    postalCode: string;

    @Column()
    status: AddressStatus;

}

export enum AddressStatus {
    INACTIVE,
    ACTIVE
}