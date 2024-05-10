import {Injectable} from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration.interface';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('mysql.host'),
            port: this.configService.get('mysql.port'),
            username: this.configService.get('mysql.username'),
            password: this.configService.get('mysql.password'),
            database: this.configService.get('mysql.database'),
            entities: [],
            synchronize: true,
        }
    }

}