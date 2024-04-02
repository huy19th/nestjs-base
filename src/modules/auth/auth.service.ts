import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LogInResponse } from './auth.interface';
import { UserDocument } from '../users/users.schema';
import { TokensService } from 'src/providers/tokens/tokens.service';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/providers/cache/cache.service';
import { Configuration } from 'src/config/configuration.interface';

@Injectable()
export class AuthService {

    cacheExpiry: number;

    constructor(
        private usersService: UsersService,
        private tokensService: TokensService,
        private configService: ConfigService,
        private cacheService: CacheService
    ) {
        this.cacheExpiry = this.configService.get<Configuration['security']['cacheExpiry']>('security.cacheExpiry');
    }

    async logIn(email: string, password: string): Promise<LogInResponse> {
        const user: UserDocument = await this.usersService.findUserByEmail(email);
        if (!user) throw new NotFoundException({ message: 'User not found' });
        const passwordCorrect = await user['comparePassword'](password);
        if (!passwordCorrect) throw new UnauthorizedException({ message: 'Password incorrect' });
        const _id: string = user._id.toString();
        const timestamp: string = Date.now().toString();
        const accessToken: string = this.tokensService.signJwt(
            { _id, key: timestamp },
            this.configService.get<Configuration['security']['accessTokenExpiry']>('security.accessTokenExpiry')
        );
        this.cacheService.redis.set(timestamp, accessToken, this.cacheExpiry);
        return { accessToken };
    }

    async register(email: string, password: string): Promise<void> {
        await this.usersService.create({ email, password });
    }
}