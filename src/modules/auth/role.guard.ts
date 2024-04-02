import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/users.schema';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const req: Request = context.switchToHttp().getRequest();
        const userId: string = req['userId'];
        const user: UserDocument = await this.usersService.findUserById(userId);
        return requiredRoles.includes(user.role);
    }
}