import { IRepo } from '../base/IBaseRepository';
import { Task } from "../../schema/task";
import { TaskNames } from '../../schema/taskNames';
import { TaskTypes } from '../../schema/taskTypes';

export interface ITaskRepository  extends IRepo<Task> {
    getAll(query: any): Promise<Array<Task>>
    getAllTaskNames(): Promise<Array<TaskNames>>
    getAllTaskTypes(): Promise<Array<TaskTypes>>
    filterTask(filter: any): Promise<Task>
    deleteTask(id: string): Promise<void>
    updateTask(task_id: string, task_params: Task): Promise<Task>
    checkIfTaskNameExists(name: number) : Promise<TaskNames>
    checkIfTaskTypeExists(type: number) : Promise<TaskTypes>
    findById(id: string): Promise<Task>

}