import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { WalletsService } from '../wallets/wallets.service';
import { Wallet } from '@prisma/client';

@Injectable()
export class TransactionsService {

    private transaction: PrismaService['transaction'];

    constructor(
        private prismaService: PrismaService,
        private walletsService: WalletsService,
    ) {
        this.transaction = this.prismaService.transaction;
    }

    getTransaction(id: string): Promise<Transaction> {
        return this.transaction.findFirst({ where: { id } });
    }

    createTransaction(fromId: string, toId: string, money: number, description: string = ''): Promise<Transaction> {
        return this.prismaService.$transaction(async () => {
            const fromWallet = await this.walletsService.adjustBalance(fromId, -money);
            if (!fromWallet) throw new NotFoundException({ message: `Sender's wallet not found` });
            if (fromWallet.balance < 0) throw new BadRequestException({ message: 'Insufficient funds' });
            const toWallet = await this.walletsService.adjustBalance(toId, money);
            if (!toWallet) throw new NotFoundException({ message: `Receiver's wallet not found` });
            const transaction = await this.transaction.create({ data: { fromId, toId, money, description } });
            return transaction;
        });
    }

}