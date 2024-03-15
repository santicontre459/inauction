import {
    Entity,
    Column,
    ManyToOne
} from "typeorm";
import { Length } from "class-validator";
import { Role } from './role';
import { BaseEntity } from './common/audit/baseEntity';
import { Company } from './company';

@Entity("User")
export class User extends BaseEntity {

    @ManyToOne(() => Role, role => role.id) 
    role: Role; 
    
    @ManyToOne(() => Role, subrole => subrole.id) 
    subrole: Role;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Length(8, 20)
    password: string;

    @Column()
    status: UserStatus;
    
    @Column()
    email_verified: boolean;

    @Column({ nullable: true })
    verification_status: string;

    @Column()
    phoneNumber: string;

    @Column()
    registrationMethod: UserRegistrationMethod;

    @Column()
    registrationType: UserRegistrationType;

    @Column({ nullable: true })
    firstLogin: Date;

    @Column({ nullable: true })
    lastLogin: Date;
      
    @ManyToOne(() => Company, company => company.id,{ nullable: true })
    company: Company;

    @Column({ nullable: true })
    position: UserPosition
}

export enum UserStatus {
    INACTIVE,
    ACTIVE,
}

export enum UserPosition {
    Chief_Executive_Officer = 1,
    Chief_Operating_Officer  = 2,
    Chief_Financial_Officer= 3,
    Chief_Procurement_Officer = 4,
    Chief_Legal_Officer = 5,
    Chief_Technology_Officer = 6,
    Internal_Expert = 7,
    External_Expert = 8
}

export enum UserRegistrationMethod {
    WEB_CONSOLE = 1,
    SUPERADMIN  = 2,
    MOBILE= 3,
}

export enum UserRegistrationType {
    SELF_REGISTRATION = 1,
    BY_INVITATION = 2,
    BY_SUPERADMIN = 3,
    MOBILE = 4,
    BY_CUSTOMER = 5,
    INITIAL_DB_SEEDER =  6
}