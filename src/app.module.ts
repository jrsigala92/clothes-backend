import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import {CategoriesModule} from './categories/categories.module'
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }), UsersModule, ProductsModule, CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
