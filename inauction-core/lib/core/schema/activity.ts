import {Entity, Column, OneToOne, PrimaryColumn, ManyToOne} from "typeorm";
import { Category } from "./category";
import { BaseEntity } from "./common/audit/baseEntity";

@Entity("Activity")
export class Activity extends BaseEntity {
    
    @Column()
    name: string;

    @Column()
    code: string;

    @ManyToOne(() => Category, category => category.id)
    category: Category;

    @Column()
    status: ActivityStatus;

}
export enum ActivityStatus {
    INACTIVE,
    ACTIVE
}