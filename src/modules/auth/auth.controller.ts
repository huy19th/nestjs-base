import {
    Controller,
    Body,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInResponse } from './auth.interface';
import { LogInDto, RegisterDto } from './auth.dto';
import { Public } from './public.decorator';
import { TimeExeInterceptor } from 'src/interceptors/time-execution.interceptor';

// @UseInterceptors(TimeExeInterceptor) // bind interceptor to controller
@Public()
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async logIn(@Body() { email, password }: LogInDto): Promise<LogInResponse> {
        return await this.authService.logIn(email, password);
    }

    @Post('register')
    async register(@Body() { email, password }: RegisterDto): Promise<void> {
        await this.authService.register(email, password);
    }
}