import { TaskNames } from './taskNames';
import { ManyToOne } from 'typeorm';
import { Column, PrimaryColumn } from 'typeorm';
import { Entity } from 'typeorm';


@Entity("TaskTypes")
export class TaskTypes  {

    @PrimaryColumn()
    id: number;

    @Column()
    name:string;
    
    @ManyToOne(() => TaskNames, taskName => taskName.id)
    taskName: TaskNames;
}