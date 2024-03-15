import { getRepository, ObjectType, UpdateResult } from 'typeorm';
import { IRepo } from './IBaseRepository';

export abstract class BaseRepository<T> implements IRepo<T> {
 private type: ObjectType<T>;
  constructor(type: ObjectType<T>) {
    this.type = type;  
  }
  
    create(item: T): Promise<T> {
        const repo = getRepository(this.type);
       return repo.save(item);
         
    }

    update(id: string, item: T): Promise<UpdateResult> {
        const repo = getRepository(this.type);
        return repo.update(id, item);

    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<T[]> {
        const repo = getRepository(this.type);
        return repo.find();
    }

    findOne(id: string): Promise<T> {
        const repo = getRepository(this.type);
        return repo.findOne(id);
    }
}