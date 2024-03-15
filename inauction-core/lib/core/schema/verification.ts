import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { User } from "./user";

@Entity("Verification")
export class Verification extends BaseEntity {

    @Column({ unique: true })
    token: string;

    @Column()
    expiration: number;

    @ManyToOne(() => User, user => user.id)
    user: User;
}

