import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { Configuration } from './configuration.interface';
require('dotenv').config();

const config: Configuration = {
    port: +process.env.PORT || 8080,
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: +process.env.MYSQL_PORT || 1001,
        username: process.env.MYSQL_USERNAME || 'nest-base',
        password: process.env.MYSQL_PASSWORD || 'nest-base',
        database: process.env.MYSQL_DATABASE || 'nest-base'
    }
};

export const configuration: ConfigFactory<Configuration> = () => config;