import { IRepo } from '../base/IBaseRepository';
import { TaskNote } from "../../schema/taskNote";

export interface ITaskNoteRepository  extends IRepo<TaskNote> {
    getAll(query: any): Promise<Array<TaskNote>>
    updateTaskNote(taskNote_id: string, taskNote_params: TaskNote): Promise<TaskNote>
    findById(id: string): Promise<TaskNote>

}