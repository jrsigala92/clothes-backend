
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product>{
  constructor(@InjectRepository(Product) repo){
      super(repo)
  }
}