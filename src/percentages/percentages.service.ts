import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Percentage } from './percentages.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class PercentagesService {
  async save(percentageDetails: Percentage): Promise<Percentage> {
    const percentageEntity: Percentage = percentageDetails.id ? await Percentage.findOne({where:{id:percentageDetails.id}}) : Percentage.create();
    
    const {name,quantity } = percentageDetails;
    percentageEntity.name = name;
    percentageEntity.quantity = quantity;

    await Percentage.save(percentageEntity);
    return percentageEntity;
  }
  
  async find(id: number):Promise<Percentage>{
    return await Percentage.findOne({where: {id:id}});
  }

  async getAll(): Promise<Percentage[]> {
    return await Percentage.find();
  }
}