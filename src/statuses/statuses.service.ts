
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class StatusesService extends TypeOrmCrudService<Status>{
  constructor(@InjectRepository(Status) repo){
      super(repo)
  }
}