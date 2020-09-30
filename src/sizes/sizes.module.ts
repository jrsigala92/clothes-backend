import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { Size } from './size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  providers: [SizesService],
  controllers: [SizesController],
})
export class SizesModule {}