import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { WalletsModule } from '../wallets/wallets.module';
import { PrismaModule } from 'src/providers/prisma/prisma.module';

@Module({
    imports: [
        WalletsModule,
        PrismaModule,
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule { }