import { Guid } from "guid-typescript";
import {
    Entity, Column, ManyToOne, BeforeInsert
} from "typeorm";
import { BaseEntity } from "./common/audit/baseEntity";
import { Lot } from "./lot";
import { Uom } from "./uom";

@Entity("LotDetail")
export class LotDetail extends BaseEntity {
    
    @Column()
    title: string;

    @ManyToOne(() => Lot, lot => lot.id) 
    lot: Lot;

    @ManyToOne(() => Uom, uom => uom.id) 
    uom: Uom;

    @Column()
    quantity: Number;
   
    @Column()
    current_price: Number;
    
    @Column()
    qualification_price: Number;
    
    @Column()
    current_value: Number;
    
    @Column()
    qualification_value: Number;
}
