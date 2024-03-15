import { Column, PrimaryColumn } from 'typeorm';
import { Entity } from 'typeorm';


@Entity("TaskNames")
export class TaskNames  {

    @PrimaryColumn()
    id: number;

    @Column()
    name:string;
}