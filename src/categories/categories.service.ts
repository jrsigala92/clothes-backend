
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category>{
  constructor(@InjectRepository(Category) repo){
      super(repo)
  }
}