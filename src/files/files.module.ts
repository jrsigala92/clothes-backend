import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { File } from './files.entity';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
