import { ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from './common/audit/baseEntity';
import { Event } from './event';
import { Expert } from './expert';
import { TaskNames } from './taskNames';
import { TaskTypes } from './taskTypes';
import { User } from './user';

@Entity("Task")
export class Task extends BaseEntity {

    @ManyToOne(() => TaskNames, name => name.id)
    name: TaskNames;

    @ManyToOne(() => TaskTypes, type => type.id)
    type: TaskTypes;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Expert, expert => expert.id)
    expert: Expert;
    
    @ManyToOne(() => Event, event => event.id, { nullable: true })
    event: Event;  
    
    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
           
    @Column()
    compilationStatus: CompilationStatus;

    @ManyToOne(() => User, reporter => reporter.id)
    reporter: User;
}  


export enum CompilationStatus {
    COMPLETED, 
    IN_PROGRESS,
    CANCELLED, 
    TODO,
    WONT_DO
}
