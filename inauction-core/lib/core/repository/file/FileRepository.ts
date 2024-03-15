import { getRepository } from "typeorm";
import { File } from "../../schema/file";
import { BaseRepository } from '../base/BaseRepository';
import { IFileRepository } from './IFileRepository';

export default class FileRepository extends BaseRepository<File> implements IFileRepository {
}