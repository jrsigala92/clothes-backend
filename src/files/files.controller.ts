import { Controller, Get, Post,UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { File } from './files.entity';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(public filesService: FilesService) {}

  // upload single file
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Post('uploadMultipleFiles')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),)
  async uploadMultipleFiles(@UploadedFile() file, @Body() params) {
      console.log(file);
      console.log(params.productId);
    const response = [];
    // files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        destination: file.destination
      };
      
      response.push(fileReponse);
      let fileToSave = new File();
      fileToSave.name =  fileReponse.filename;
      fileToSave.path = fileReponse.destination;
      fileToSave.productId = params.productId;
      this.filesService.save(fileToSave);
    // });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  // @Get(':imagename')
  @Get(':imagename')
  getImage(@Res() res, @Param() param) {
  // getImage(@Res() res) {
    
    console.log(param.name);
    console.log(param.imagename);
    const name = param.name;
    const response = res.sendFile(param.imagename, {root:'./uploads'});
    console.log(response);
    // console.log(res.sendFile(param.name, { root: './uploads' }));
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}