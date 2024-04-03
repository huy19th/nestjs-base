import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodemailerConfigService } from 'src/config/nodemailer.config';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';

@Module({
    imports: [MailerModule.forRootAsync({ useClass: NodemailerConfigService, imports: [ConfigModule] })],
    controllers: [EmailsController],
    providers: [EmailsService],
    exports: [EmailsService]
})
export class EmailsModule { }