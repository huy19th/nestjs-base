import { diskStorage } from 'multer';
import { Request } from 'express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multerDiskStorage = diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        const destination = join(__dirname, '../../../src/upload');
        if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true });
        }
        cb(null, destination);
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});