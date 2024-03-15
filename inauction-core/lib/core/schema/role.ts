import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne
} from "typeorm";

@Entity("Role")
export class Role {

    @PrimaryColumn()
    id: number;

    @Column()
    roleName: string;
    
    @Column()
    status: RoleStatus;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    modifiedAt: Date;
    
    @Column()
    isSubRole: boolean;

    @ManyToOne(() => Role, parentRole => parentRole.id)
    parentRole: Role;

}


export enum RoleStatus {
    INACTIVE, 
    ACTIVE
}

export class SystemRoles {
    public static Superadmin = 1;
    public static Host = 2;
    public static Bidder = 3;
    public static Audit = 4;
    public static SuperadminAdmin = 5;
    public static SuperadminFinance = 6;
    public static HostAdmin = 7;
    public static HostExpert = 8;
    public static BidderAdmin = 9;
    public static BidderExpert = 10;
}

