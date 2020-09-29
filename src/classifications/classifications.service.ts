import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Classification } from './classification.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class ClassificationsService {
  async save(categoryDetails: Classification): Promise<Classification> {
    const categoryEntity: Classification = categoryDetails.id ? await Classification.findOne({where:{id:categoryDetails.id}}) : Classification.create();
    
    const {name,description } = categoryDetails;
    categoryEntity.name = name;
    categoryEntity.description = description;

    await Classification.save(categoryEntity);
    return categoryEntity;
  }
  
  async find(id: number):Promise<Classification>{
    return await Classification.findOne({where: {id:id}});
  }

  async getAll(): Promise<Classification[]> {
    return await Classification.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await Classification.delete(id);
  }
}