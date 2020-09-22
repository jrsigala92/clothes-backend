import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Category } from './category.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class CategoriesService {
  async save(categoryDetails: Category): Promise<Category> {
    const categoryEntity: Category = categoryDetails.id ? await Category.findOne({where:{id:categoryDetails.id}}) : Category.create();
    
    const {name,description } = categoryDetails;
    categoryEntity.name = name;
    categoryEntity.description = description;

    await Category.save(categoryEntity);
    return categoryEntity;
  }
  
  async find(id: number):Promise<Category>{
    return await Category.findOne({where: {id:id}});
  }

  async getAll(): Promise<Category[]> {
    return await Category.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await Category.delete(id);
  }
}