import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import 'dotenv/config'

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      host: 'remotemysql.com',
      // host: 'localhost',
      port: 3306,
      username: 'OlgTZqcyEa',
      // username: 'root',
      password: 'KTbwSmDjAM',
      // password: '22jesus3',
      database:'OlgTZqcyEa',
      // database:'clothesdb',
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    }
  }
}
