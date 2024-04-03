import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const WinstonConfig = {
    format: winston.format.combine(
        winston.format.colorize({
            message: true,
            level: true,
            colors: {
                info: 'green',
                error: 'red'
            }
        }),
        winston.format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(log => `[${log.timestamp}] [${log.context}] [${log.level}] ${log.stack || log.message}`),
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            level: 'error',
            filename: './src/logs/error/error.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
}