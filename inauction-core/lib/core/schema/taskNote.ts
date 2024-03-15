import { ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from './common/audit/baseEntity';
import { Task } from './task';
import { User } from './user';

@Entity("TaskNote")
export class TaskNote extends BaseEntity {

    @Column('text')
    note: string;

    @ManyToOne(() => Task, task => task.id)
    task: Task;

    @ManyToOne(() => User, commenter => commenter.id)
    commenter: User;
}
