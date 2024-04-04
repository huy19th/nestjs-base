import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { WalletsModule } from './modules/wallets/wallets.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    WalletsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }