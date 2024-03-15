import { ITaskNoteRepository } from './ITaskNoteRepository';
import { TaskNote } from "../../schema/taskNote";
import { BaseRepository } from "../base/BaseRepository";
import { getRepository } from 'typeorm';

export default class TaskNoteRepository
extends BaseRepository<TaskNote> implements ITaskNoteRepository {


    public async getAll(query: any): Promise<Array<TaskNote>> {

        const taskRepository = getRepository(TaskNote);
        if (query) {
            return await taskRepository.find({
                where: query,
                relations: ['task', 'commenter']
            });
        } else {
            return await taskRepository.find({ relations: ['task', 'commenter']});
        }
    }

    public async updateTaskNote(taskNote_id: string, taskNote_params: TaskNote):Promise<TaskNote> {
        const repository = getRepository(TaskNote);
        await repository.update(taskNote_id, taskNote_params);
        return repository.findOne(taskNote_id, {
            relations: [ 'task', 'commenter']});
    }

    public async findById(id: string): Promise<TaskNote> {
        const repository = getRepository(TaskNote);
        return await repository.findOne({
                where : {
                    id: id,
                    isDeleted: false
                },
                relations: [
                    'task', 'commenter'
                ]
            }
        );
    }

}