import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ShoppingCartElem } from './shopping-cart-elem.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class ShoppingCartElemsService {
  async save(shoppingCartElemDetails: ShoppingCartElem): Promise<ShoppingCartElem> {
    const shoppingCartElemEntity: ShoppingCartElem = shoppingCartElemDetails.id ? await ShoppingCartElem.findOne({where:{id:shoppingCartElemDetails.id}}) : ShoppingCartElem.create();
    
    const {productId, userId, price, name } = shoppingCartElemDetails;
    shoppingCartElemEntity.productId = productId;
    shoppingCartElemEntity.userId = userId;
    shoppingCartElemEntity.name = name;
    shoppingCartElemEntity.price = price;

    await ShoppingCartElem.save(shoppingCartElemEntity);
    return shoppingCartElemEntity;
  }
  
  async find(id: number):Promise<ShoppingCartElem[]>{
    return await ShoppingCartElem.find({where: {userId:id}});
  }

  async getAll(): Promise<ShoppingCartElem[]> {
    return await ShoppingCartElem.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await ShoppingCartElem.delete(id);
  }
}