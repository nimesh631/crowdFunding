import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard} from './auth.guard';
import { Inject } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
  
    @Post('login')
    @ApiBody({
      description:"login details",
      schema: {
        type: 'object',
        properties: {
          email: {type: 'string', format: 'email', example:"ni@gmail.com"},
          password: {type:'string', example:"nim12"},
        },
        required: ['email','password'],
      }
    })
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.validateUser(signInDto.email, signInDto.password);
      }
    
    }
