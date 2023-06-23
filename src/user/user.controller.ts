import {
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
@UseGuards(JwtGuard) //this contains a function that stand between an end point and route handlers which either allow or dissaallow the execution of the routehandler; auth middleware which is used for everything in this controller
export class UserController {
  @Get('me')
  getMe(
    @GetUser() user: User,
    @GetUser('email') email: string,
  ) {
    return user;
  }

  @Patch()
  editUser() {}
}
