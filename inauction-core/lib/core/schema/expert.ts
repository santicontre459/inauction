import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { User } from "./user";

@Entity("Expert")
export class Expert extends BaseEntity {

    // at user table position add a general position Expert for experts user
    // this should be string
    @Column()
    position: string;

    @ManyToOne(() => User, user => user.id)
    user: User;
    
    @ManyToOne(() => User, customer => customer.id)
    customer: User;

    @Column({ default: false })
    deletedByAdmin: boolean;

}

