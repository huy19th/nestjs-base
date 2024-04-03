import { Injectable, Logger } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {

    private readonly logger = new Logger(EmailsService.name);

    constructor(private readonly mailerService: MailerService) { }

    send(options: ISendMailOptions): void {
        this.logger.log(options)
        this.mailerService.sendMail(options)
            .then(() => { })
            .catch((err) => this.logger.error(err));
    }
}