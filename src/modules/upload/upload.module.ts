import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerDiskStorage } from 'src/config/multer.config';

@Module({
    imports: [MulterModule.register({storage: multerDiskStorage})],
    controllers: [UploadController]
})
export class UploadModule { }