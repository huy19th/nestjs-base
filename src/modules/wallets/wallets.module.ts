import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
    imports: [PrismaModule],
    controllers: [WalletsController],
    providers: [WalletsService],
    exports: [WalletsService],
})
export class WalletsModule { }