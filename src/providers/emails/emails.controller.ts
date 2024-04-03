import { Controller, Body, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {

    constructor(private emailsService: EmailsService) { }

    @Post()
    sendEmail(@Body('message') message: string, @Body('to') to: string) {
        this.emailsService.send({
            to,
            subject: 'test nodemailer',
            context: { message }
        });
        return 'ok';
    }
}