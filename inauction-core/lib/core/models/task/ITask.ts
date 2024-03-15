import { Event } from '../../schema/event';
import { Company } from '../../schema/company';
import { Expert } from '../../schema/expert';
import { TaskNames } from '../../schema/taskNames';
import { TaskTypes } from '../../schema/taskTypes';
import { CompilationStatus } from '../../schema/task';
import { User } from "../../schema/user";

export interface ITaskUpdate {
    id: string
    name: TaskNames; 
    type: TaskTypes;
    expert: Expert;
    event: Event;
    startDate:Date;
    endDate: Date;
    compilationStatus: CompilationStatus;
    company: Company;


}
export interface ITaskModel {
    name: TaskNames;
    type: TaskTypes;
    description?: string;
    expert: Expert;
    event?: Event;
    startDate: Date;
    endDate: Date;
    compilationStatus: CompilationStatus;
    reporter: User;
}


export interface ITaskName {
    id:number;
    name:string;
    types: Array<ITaskType>
}

export interface ITaskType {
    id:number;
    name:string;
}