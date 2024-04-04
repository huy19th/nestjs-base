import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './transactions.dto';

@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) { }

    @Post()
    async createTransaction(@Body() body: CreateTransactionDto) {
        const transaction = await this.transactionsService.createTransaction(body.fromId, body.toId, body.money, body.description);
        return { ...transaction, money: transaction.money.toString() };
    }

}