import { Controller, Param, Body, Get, Post, Patch, Delete } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { UserDocument } from './users.schema';
import { Roles } from '../auth/role.decorator';
import { ROLE_ADMIN } from './users.constant';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get(':id')
    async getProfile(@Param('id') id: string) {
        const profile = await this.usersService.getUserProfile(id);
        return profile;
    }

    @Roles(ROLE_ADMIN)
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<UserDocument> {
        const user: UserDocument = await this.usersService.create(body);
        return user;
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<UserDocument> {
        const user: UserDocument = await this.usersService.updateUser(id, body);
        return user;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<string> {
        await this.usersService.deleteUser(id);
        return 'success';
    }
}