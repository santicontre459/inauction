import {ITaskRepository} from './ITaskRepository';
import {Task} from "../../schema/task";
import {BaseRepository} from "../base/BaseRepository";
import {TaskNames} from '../../schema/taskNames';
import {TaskTypes} from '../../schema/taskTypes';
import {getRepository} from 'typeorm';

export default class TaskRepository 
extends BaseRepository<Task> implements ITaskRepository {


    public async getAll(query: any): Promise<Array<Task>> {

        const taskRepository = getRepository(Task);
        if (query) {
            return await taskRepository.find({
                where: query,
                relations: [
                    'expert', 'reporter', 'event', 'name', 'type'
                ]
            });
        } else {
            return await taskRepository.find({ relations: ['expert', 'reporter', 'event', 'name', 'type']});
        }
    }

    public async getAllTaskNames(): Promise<TaskNames[]> {
        const taskRepository = getRepository(TaskNames);
        return taskRepository.find();
    }

    public async getAllTaskTypes(): Promise<TaskTypes[]> {
        const taskRepository = getRepository(TaskTypes);
        return taskRepository.find({ relations: ['taskName']});
    }

    public async findById(id: string): Promise<Task> {
        const repository = getRepository(Task);
        return await repository.findOne({
                where : {
                    id: id,
                    isDeleted: false
                },
                relations: [
                    'expert', 'reporter', 'event', 'name', 'type'
                ]
            }
        );
    }

    public async filterTask(filter: any): Promise<Task> {
        const taskRepository = getRepository(Task);
        return await taskRepository.findOne(filter, {
            relations: [
                'expert', 'reporter', 'event', 'name', 'type'
            ]
        });
    }

    public async deleteTask(id: string): Promise<void> {
        const taskRepository = getRepository(Task);
        await taskRepository.createQueryBuilder()
            .update(Task)
            .set({
                isDeleted: true
            })
            .where("id = :id", { id: 1 })
            .execute();

    }

    public async updateTask(task_id: string, task_params: Task):Promise<Task> {
        const repository = getRepository(Task);
        await repository.update(task_id, task_params);
        return repository.findOne(task_id, {
            relations: [
                'expert', 'reporter', 'event', 'name', 'type'
            ]});
    }

    public async checkIfTaskNameExists(name: number): Promise<TaskNames> {
        const taskNameRepository = getRepository(TaskNames);
        return await taskNameRepository.findOne({ where: { id: name } });
    }

    public async checkIfTaskTypeExists(type: number): Promise<TaskTypes> {
        const taskTypeRepository = getRepository(TaskTypes);
        return await taskTypeRepository.findOne({ where: { id: type } });
    }
}