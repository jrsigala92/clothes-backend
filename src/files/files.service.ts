import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { File } from './files.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import { Product } from 'src/products/product.entity';

@Injectable()
export class FilesService {
  async save(fileDetails: File): Promise<File> {
    const fileEntity: File = fileDetails.id ? await File.findOne({where:{id:fileDetails.id}}) : File.create();
    
    const {name, path, productId } = fileDetails;
    fileEntity.name = name;
    fileEntity.path = path;
    fileEntity.product =  await Product.findOne({where:{id:productId}});;

    await File.save(fileEntity);
    return fileEntity;
  }
  
  async find(id: number):Promise<File>{
    return await File.findOne({where: {id:id}});
  }

  async getAll(): Promise<File[]> {
    return await File.find();
  }
  async delete(id: number):Promise<DeleteResult>{
    return await File.delete(id);
  }
}