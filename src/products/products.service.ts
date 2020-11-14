
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, getManager, getConnection, AdvancedConsoleLogger } from 'typeorm';
import { Product } from './product.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import ProductDto from 'src/dto/create-product.dto';
import { Percentage } from 'src/percentages/percentages.entity';
import TransactionDto from 'src/dto/transaction.dto';
import { User } from 'src/users/user.entity';
import { Status } from 'src/statuses/status.entity';
import { Observable } from 'rxjs';
import { Category } from 'src/categories/category.entity';
import { Classification } from 'src/classifications/classification.entity';
import { Size } from 'src/sizes/size.entity';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { ShoppingCartElem } from 'src/shopping-cart-elem/shopping-cart-elem.entity';
import { ShoppingCartElemModule } from 'src/shopping-cart-elem/shopping-cart-elems.module';
import { Transaction } from 'src/transactions/transaction.entity';
import { PRIORITY_ABOVE_NORMAL } from 'constants';

// @Injectable()
// export class ProductsService extends TypeOrmCrudService<Product>{
//   constructor(@InjectRepository(Product) repo){
//       super(repo)
//   }
// }

@Injectable()
export class ProductsService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) { }
  async save(productDetails: ProductDto): Promise<Product> {
    console.log(productDetails);
    let percentages: Percentage[] = [];
    const productEntity: Product = productDetails.id ? await Product.findOne({ where: { id: productDetails.id } }) : Product.create();
    const { name, description, price, displayInShop, available, userID, categoryID, classificationID, statusID, sizeID } = productDetails;
    productEntity.name = name;
    productEntity.description = description;
    productEntity.price = price;
    productEntity.displayInShop = displayInShop;
    // productEntity.available = available;
    productEntity.user = await User.findOne({ where: { id: productDetails.userID.id } });
    productEntity.category = await Category.findOne({ where: { id: categoryID.id } });
    productEntity.size = await Size.findOne({ where: { id: sizeID.id } });
    productEntity.classification = await Classification.findOne({ where: { id: classificationID.id } });
    productEntity.status = await Status.findOne({ where: { id: statusID.id } });

    (await this.getPercentages()).forEach(response => {
      if (!percentages) {
        percentages = [];
      }

      percentages.push(response);
    });

    productEntity.profit = productEntity.price * (percentages.find(e => e.name === 'Ganancia').quantity / 100);
    productEntity.userProfit = productEntity.price * (percentages.find(e => e.name === 'Usuario').quantity / 100);
    productEntity.donation = productEntity.price * (percentages.find(e => e.name === 'Donación').quantity / 100);

    await Product.save(productEntity);
    return productEntity;
  }

  async getPercentages(): Promise<Percentage[]> {
    return await Percentage.find();
  }

  async getShoppingCartElements(userId: number): Promise<ShoppingCartElem[]> {
    return await ShoppingCartElem.find({ where: { userId: userId } });
  }

  async find(id: number): Promise<Product> {
    return await Product.findOne({ where: { id: id }, relations: ['category', 'status', 'user', 'classification', 'size', 'files'] });
  }

  async getAll(): Promise<Product[]> {
    return await Product.find({ relations: ['category', 'status', 'user', 'files'] });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await Product.delete(id);
  }

  async buy(transaction: TransactionDto): Promise<Product> {
    const { userId, productIds } = transaction;
    const userEntity: User = await User.findOne({ where: { id: transaction.userId } });
    // product information update
    const productEntity: Product = await Product.findOne({ where: { id: transaction.productIds }, relations: ['user'] });
    productEntity.buyer = userEntity;
    productEntity.status = await Status.findOne({ where: { name: 'Vendido' } });
    productEntity.displayInShop = false;
    productEntity.available = false;

    // owner of the clothe update
    const ownerEntity = await User.findOne({ where: { id: productEntity.user.id } });

    console.log('actual:', ownerEntity.balance);
    console.log('ganancia:', productEntity.userProfit);
    ownerEntity.balance = (ownerEntity.balance ?? 0) + productEntity.userProfit;
    console.log('final:', ownerEntity.balance);
    await Product.save(productEntity);
    await User.save(ownerEntity);
    return productEntity;
  }

  async buyWithStripe(transaction: TransactionDto): Promise<any> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    let totalAmmount: number = 0.0;
    console.log(transaction);

    await queryRunner.startTransaction();
    // await getManager().transaction(async transactionalEntityManager => {
    try {
      for (let index = 0; index < transaction.productIds.length; index++) {
        console.log('indice:', index);
        const productEntity: Product = await Product.findOne({ where: { id: transaction.productIds[index] }, relations: ['user'] });//.then(res => {
        console.log(productEntity);
        const userEntity: User = await User.findOne({ where: { id: transaction.userId } });
        console.log(userEntity);
        const ownerEntity = await User.findOne({ where: { id: productEntity.user.id } });
        console.log(ownerEntity);
        console.log(transaction.productIds[index]);
        console.log(productEntity.price);
        totalAmmount = totalAmmount + Number.parseFloat(productEntity.price.toString());
        //      
        // product information update
        productEntity.buyer = userEntity;
        productEntity.status = await Status.findOne({ where: { name: 'Vendido' } });
        productEntity.displayInShop = false;
        productEntity.available = false;

        // owner of the clothe update

        console.log('actual:', ownerEntity.balance);
        console.log('ganancia:', productEntity.userProfit);
        ownerEntity.balance = (ownerEntity.balance ?? 0) + productEntity.userProfit;
        console.log('final:', ownerEntity.balance);
        await Product.save(productEntity);
        await User.save(ownerEntity);
      }
      let shoppingCartElements: ShoppingCartElem[] = [];
      // this.getShoppingCartElements(transaction.userId).
      console.log('========================================================= elementos en carrito');

      let currentDate = new Date();
      (await this.getShoppingCartElements(transaction.userId)).forEach(async response => {
        if (!shoppingCartElements) {
          shoppingCartElements = [];
        }
        
        console.log('========================================================= ', response);

        const transactionEntity: Transaction = Transaction.create();
        const { name, price, productId } = response;
        transactionEntity.productName = name;
        transactionEntity.productId = productId;
        transactionEntity.user = await User.findOne({where: {id: transaction.userId}});
        transactionEntity.price = price;
        transactionEntity.productName = name;
        transactionEntity.token = transaction.tokenId;
        transactionEntity.transactionDate = currentDate;
        await Transaction.save(transactionEntity);
      });
      console.log('========================================================= borrar carrito');

      await ShoppingCartElem.delete({ userId: transaction.userId });
      console.log('========================================================= pagar');

      let result = await this.stripeClient.charges.create({
        amount: totalAmmount * 100,
        // amount: 0 * 100,
        currency: 'MXN',
        source: transaction.tokenId,
        capture: true,  // note that capture: false
      });
      console.log('========================================================= commit');

      await queryRunner.commitTransaction();
      return result;

    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }
}