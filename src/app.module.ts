import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongo.config';
import { CacheModule } from './providers/cache/cache.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { TokensModule } from './providers/tokens/tokens.module';
import { ThrottlerConfigService } from './config/throttler.config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService, imports: [ConfigModule] }),
    ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService, imports: [ConfigModule] }),
    CacheModule,
    UsersModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    // { provide: APP_GUARD, useClass: ThrottlerGuard }, bind throttle global scope
  ],
})
export class AppModule { }