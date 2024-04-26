import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { unlink } from 'fs';
import { Logger } from '@nestjs/common';

@Catch(BadRequestException)
export class UploadExceptionFilter implements ExceptionFilter {

    private logger = new Logger(UploadExceptionFilter.name, { timestamp: true });

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        const status = exception.getStatus();
        const message = exception.message;

        if (req.file) {
            this.deleteFile(req.file.path);
        }
        if (req.files) {
            if (Array.isArray(req.files)) {
                req.files.forEach(file => {
                    this.deleteFile(file.path);
                });
            }
            else {
                Object.values(req.files).flat().forEach(file => {
                    this.deleteFile(file.path);
                });
            }
        }

        res.status(status).json({ message });
    }

    deleteFile(path: string) {
        unlink(path, err => err && this.logger.error(err));
    }

}