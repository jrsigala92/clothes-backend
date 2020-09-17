import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PercentagesService } from './percentages.service';
import { PercentagesController } from './percentages.controller';
import { Percentage } from './percentages.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Percentage])],
  providers: [PercentagesService],
  controllers: [PercentagesController],
})
export class PercentageModule {}