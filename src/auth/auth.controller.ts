import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('signup') //"auth/signup"
  signup(@Body() dto: AuthDto) {
    return this.authservice.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login') //"auth/login"
  signin(@Body() dto: AuthDto) {
    return this.authservice.signin(dto);
  }
}
