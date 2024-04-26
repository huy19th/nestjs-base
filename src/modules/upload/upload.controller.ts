import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    ParseFilePipeBuilder,
    HttpStatus,
    UseFilters,
} from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express';
import { UploadOneFileDto } from './upload.dto';
import { UploadExceptionFilter } from 'src/filters/upload-exception.filter';

@Public()
@UseFilters(UploadExceptionFilter)
@Controller('upload')
export class UploadController {

    @Post('/one-file')
    @UseInterceptors(
        FileInterceptor('file'), // form's field that holds file
    )
    uploadOneFile(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({ maxSize: 1024 * 1024 }) // file size in bytes
                .addFileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ })
                .build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }), // prop exceptionFactory: A factory which receives the error message and returns an error.
        ) file: Express.Multer.File,
        @Body() body: UploadOneFileDto
    ) {
        console.log(file);
    }

    @Post('/array-of-files')
    @UseInterceptors(
        FilesInterceptor('files', 2), // 2 is max file can be uploaded
    )
    uploadArrayOfFiles(
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({ maxSize: 1024 * 1024 })
                .addFileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ })
                .build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })
        ) files: Express.Multer.File[]
    ) {
        console.log(files);
    }

    @Post('/multiple-files') // only allow files uploaded with defined field names
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'avatar', maxCount: 4 },
            { name: 'background', maxCount: 4 },
        ]), // FileFieldsInterceptor takes 2 arg: obj[] - field name & max files. multer options
    )
    uploadMultipleFiles(
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })
        ) files: Record<string, Express.Multer.File[]>
    ) {
        console.log(files);
    }
}