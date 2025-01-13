import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
        if (!user) {
            throw new UnauthorizedException("user not found");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
          }

        const payload = { sub: user.id, email: user.email, role:user.role};
        return{
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
