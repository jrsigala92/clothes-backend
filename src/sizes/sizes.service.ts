import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Size } from './size.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class SizesService {
  async save(categoryDetails: Size): Promise<Size> {
    const sizeEntity: Size = categoryDetails.id ? await Size.findOne({where:{id:categoryDetails.id}}) : Size.create();
    
    const {name } = categoryDetails;
    sizeEntity.name = name;

    await Size.save(sizeEntity);
    return sizeEntity;
  }
  
  async find(id: number):Promise<Size>{
    return await Size.findOne({where: {id:id}});
  }

  async getAll(): Promise<Size[]> {
    return await Size.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await Size.delete(id);
  }
}