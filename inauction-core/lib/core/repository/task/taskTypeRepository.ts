import { TaskTypes } from '../../schema/taskTypes';
import { ITaskTypeRepository } from './ITaskTypeRepository';
import { BaseRepository } from "../base/BaseRepository";

export default class TaskTypeRepository 
extends BaseRepository<TaskTypes> implements ITaskTypeRepository {
}