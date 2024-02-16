import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UploadsService } from "./uploads.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname, join } from "path";
import { HttMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/auth/public.decorator";


@ApiTags('uploads files')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
 
  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
    },
  }) }))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    // Handle the file, save it to a database, etc.
    //return { message: 'File uploaded successfully' };
    return new ResponseData<string>('File uploaded successfully' , HttpStatus.SUCCESS, HttMessage.SUCCESS);
  }
    //@Public()
  @Post('multiplefiles')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        //return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
    
  async uploadFiles(@UploadedFiles() files) {
    const fileNames = files.map(file => file.path);
    console.log('Files uploaded successfully:', fileNames);
    //return { message: 'Multiple files uploaded successfully' };
    return new ResponseData<string>('Multiple files uploaded successfully' , HttpStatus.SUCCESS, HttMessage.SUCCESS);
  }

  //view fiel
  @Public()
  @Get('product/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response): Promise<void> {
    //const file = join(__dirname, '..', 'uploads', filename); // Adjust the path accordingly
    const file = join('./uploads', filename); // Adjust the path accordingly
    // res.header('Content-Type', 'application/octet-stream');
    // res.header('Content-Disposition', `attachment; filename=${filename}`);
   return res.sendFile(join(process.cwd(),file));
  }
}
