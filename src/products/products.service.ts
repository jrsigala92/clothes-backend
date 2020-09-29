
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Product } from './product.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import ProductDto from 'src/dto/create-product.dto';
import { Percentage } from 'src/percentages/percentages.entity';
import TransactionDto from 'src/dto/transaction.dto';
import { User } from 'src/users/user.entity';
import { Status } from 'src/statuses/status.entity';
import { Observable } from 'rxjs';
import { Category } from 'src/categories/category.entity';
import { Classification } from 'src/classifications/classification.entity';

// @Injectable()
// export class ProductsService extends TypeOrmCrudService<Product>{
//   constructor(@InjectRepository(Product) repo){
//       super(repo)
//   }
// }

@Injectable()
export class ProductsService {
  async save(productDetails: ProductDto): Promise<Product> {
    console.log(productDetails);
    let percentages: Percentage[] = [];
    const productEntity: Product =productDetails.id ? await Product.findOne({where:{id:productDetails.id}}) : Product.create();
    const {name,description,price,available, userID, categoryID, classificationID, statusID } = productDetails;
    productEntity.name = name ;
    productEntity.description = description;
    productEntity.price = price;
    productEntity.available = available;
    productEntity.user = await User.findOne({where:{id:productDetails.userID.id}});
    productEntity.category = await Category.findOne({where:{id:categoryID.id}});
    productEntity.classification = await Classification.findOne({where:{id:classificationID.id}});
    productEntity.status = await Status.findOne({where: {name:'Disponible'}});

    (await this.getPercentages()).forEach(response =>
      {
        if(!percentages) {
          percentages = [];
        }
        
        percentages.push(response);
      });

    productEntity.profit = productEntity.price * (percentages.find(e => e.name === 'Ganancia' ).quantity / 100 );
    productEntity.userProfit = productEntity.price * (percentages.find(e => e.name === 'Usuario' ).quantity / 100 );
    productEntity.donation = productEntity.price * (percentages.find(e => e.name === 'Donación' ).quantity / 100 );

    await Product.save(productEntity);
    return productEntity;
  }

  async getPercentages():Promise<Percentage[]>{
    return await Percentage.find();
  }

  async find(id: number):Promise<Product>{
    return await Product.findOne({where: {id:id}, relations:['category', 'status','user', 'classification']});
  }

  async getAll(): Promise<Product[]> {
    return await Product.find({relations:['category','status','user']});
  }
  
  async delete(id: number):Promise<DeleteResult>{
    return await Product.delete(id);
  }

  async buy(transaction: TransactionDto):Promise<Product>
  {
    const {userId, productId } = transaction;
    const userEntity: User = await User.findOne({where:{id:transaction.userId}});
    // product information update
    const productEntity: Product = await Product.findOne({where:{id:transaction.productId}, relations:['user']});
    productEntity.buyer = userEntity;
    productEntity.status = await Status.findOne({where: {name: 'Vendido'}});
    productEntity.displayInShop = false;
    productEntity.available = false;

    // owner of the clothe update
    const ownerEntity = await User.findOne({where: {id: productEntity.user.id}});
    
    console.log('actual:', ownerEntity.balance);
    console.log('ganancia:', productEntity.userProfit);  
    ownerEntity.balance = (ownerEntity.balance ?? 0) + productEntity.userProfit;
    console.log('final:', ownerEntity.balance);  
    await Product.save(productEntity);
    await User.save(ownerEntity);
    return productEntity;
  }
}