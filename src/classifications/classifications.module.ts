import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationsService } from './classifications.service';
import { ClassificationsController } from './classifications.controller';
import { Classification } from './classification.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Classification])],
  providers: [ClassificationsService],
  controllers: [ClassificationsController],
})
export class ClassificationModule {}