import { UpdateResult } from "typeorm";

export interface IRepo<T> {
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<UpdateResult>;
    find(item: T): Promise<T[]>;
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    delete(id: string): Promise<boolean>;
    
  }