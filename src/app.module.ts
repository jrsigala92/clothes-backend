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
import { SizesModule } from './sizes/sizes.module';
// import { EmailsModule } from './emails/emails.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { StripeModule } from 'nestjs-stripe';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { ShoppingCartElemModule } from './shopping-cart-elem/shopping-cart-elems.module';
import { TransactionModule } from './transactions/transactions.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    FilesModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
      UsersModule,
      ProductsModule,
      CategoriesModule,
      StatusesModule,
      PercentageModule,
      ClassificationModule,
      SizesModule,
      StripeModule.forRoot({
        apiKey: 'sk_test_51HZPYfKegYWvj4Pp2hlK8yUGUW34WwobIXKLMnb2VI9PB0Gkr5WEjZ8P7bmATG0qqLK8wlt6OvH3Oop3XK0S9OW400v913vwgc',
        apiVersion: '2020-08-27',
      }),
      FilesModule,
      ShoppingCartElemModule,
      TransactionModule
    // , MailerModule.forRoot({
    //   transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //   defaults: {
    //     from:'"nest-modules" <modules@nestjs.com>',
    //   },
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new PugAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
