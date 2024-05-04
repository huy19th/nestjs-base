import { Module } from '@nestjs/common';
import { TokensModule } from '../tokens/tokens.module';
import { CacheModule } from 'src/providers/cache/cache.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SocketService } from './socket.service';
import { SocketGateWay } from './socket.gateway';

@Module({
    imports: [
        TokensModule,
        CacheModule,
        UsersModule,
    ],
    providers: [SocketService, SocketGateWay],
    exports: [SocketService]
})
export class SocketModule { }