import { Guid } from "guid-typescript";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    modifiedAt: Date;

    @Column({ nullable: true })
    modifiedBy: String;

    @Column({ default: false })
    isDeleted: boolean;

    @BeforeInsert()
    onBeforeInsert() {
        this.id = Guid.create().toString();
    }
}

export enum BidDirection {
    FORWARD,
    REVERSE
}
