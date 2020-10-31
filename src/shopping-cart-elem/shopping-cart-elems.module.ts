import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartElemsService } from './shopping-cart-elems.service';
import { ShoppingCartElemsController } from './shopping-cart-elems.controller';
import { ShoppingCartElem } from './shopping-cart-elem.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartElem])],
  providers: [ShoppingCartElemsService],
  controllers: [ShoppingCartElemsController],
})
export class ShoppingCartElemModule {}