import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Transaction } from './transaction.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class TransactionsService {
  async find(id: number):Promise<Transaction>{
    return await Transaction.findOne({where: {id:id}});
  }

  async getAll(): Promise<Transaction[]> {
    return await Transaction.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await Transaction.delete(id);
  }
}