import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard} from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.validateUser(signInDto.email, signInDto.password);
      }
    
    }
