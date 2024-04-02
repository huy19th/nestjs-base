import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongo.config';
import { CacheModule } from './providers/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService, imports: [ConfigModule] }),
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }