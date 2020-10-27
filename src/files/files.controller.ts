import { Controller, Get, Post,UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('files')
export class FilesController {
  constructor() {}

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
      };
      response.push(fileReponse);
    // });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  // @Get(':imagename')
  @Get()
  getImage(@Res() res) {
  // getImage(@Res() res) {
    console.log('entró');
    const response = res.sendFile('th5221.jpg', { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}