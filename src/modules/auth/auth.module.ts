import { Module } from '@nestjs/common';
import { TokensModule } from 'src/providers/tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CacheModule } from 'src/providers/cache/cache.module';

@Module({
    imports: [
        ConfigModule,
        CacheModule,
        TokensModule,
        UsersModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }