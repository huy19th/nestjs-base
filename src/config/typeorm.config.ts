import { Artist } from '../modules/artists/artists.schema';
import { Song } from '../modules/songs/songs.schema';
import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

const env = process.env;

export const typeOrmConfig: DataSourceOptions = {
    type: 'mysql',
    host: env.MYSQL_HOST || 'localhost',
    port: +env.MYSQL_PORT || 1001,
    username: env.MYSQL_USERNAME || 'nest-base',
    password: env.MYSQL_PASSWORD || 'nest-base',
    database: env.MYSQL_DATABASE || 'nest-base',
    entities: [Artist, Song],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
}

export default new DataSource(typeOrmConfig);