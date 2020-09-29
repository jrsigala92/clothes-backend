import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module'
import { StatusesModule } from './statuses/statuses.module';
import { PercentageModule } from './percentages/percentages.module';
import { ClassificationModule } from './classifications/classifications.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    UsersModule, ProductsModule, CategoriesModule, StatusesModule, PercentageModule, ClassificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
