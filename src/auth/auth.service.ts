import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { User } from 'src/users/users.entity/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password:string): Promise<{access_token: string}> {
        const user = await this.usersService.findByEmail(email);
        if (user?.password !== password) {
            throw new UnauthorizedException();
          }

        const payload = { sub: user.id, username: user.name};
        return{
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}