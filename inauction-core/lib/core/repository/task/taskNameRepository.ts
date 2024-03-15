import { ITaskNamesRepository } from './ITaskNameRepository';
import { TaskNames } from '../../schema/taskNames';
import { BaseRepository } from "../base/BaseRepository";

export default class TaskNamesRepository 
extends BaseRepository<TaskNames> implements ITaskNamesRepository {
}