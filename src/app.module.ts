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
// import { EmailsModule } from './emails/emails.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    UsersModule, ProductsModule, CategoriesModule, StatusesModule, PercentageModule, ClassificationModule
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
