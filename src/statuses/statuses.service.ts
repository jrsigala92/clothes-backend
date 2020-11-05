
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Status } from './status.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class StatusesService{
  async save(statusDetails: Status): Promise<Status> {
    const statusEntity: Status = statusDetails.id ? await Status.findOne({where:{id:statusDetails.id}}) : Status.create();
    
    const {name } = statusDetails;
    statusEntity.name = name;

    await Status.save(statusEntity);
    return statusEntity;
  }
  
  async find(id: number):Promise<Status>{
    return await Status.findOne({where: {id:id}});
  }

  async getAll(): Promise<Status[]> {
    return await Status.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await Status.delete(id);
  }
}