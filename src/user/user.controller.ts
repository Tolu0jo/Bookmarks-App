import {
    Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AuthDto } from '../auth/dto';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@Controller('users')
@UseGuards(JwtGuard) //this contains a function that stand between an end point and route handlers which either allow or dissaallow the execution of the routehandler; auth middleware which is used for everything in this controller that why the decorator is located here
export class UserController {
    constructor(private userService:UserService){}
  @Get('me')
  getMe(
    @GetUser() user: User,
    @GetUser('email') email: string,
  ) {
    return user;
  }

   @Patch()
     editUser(
    @GetUser('id') userId:string,
    @Body()dto:EditUserDto) {
  return this.userService.editUser(userId,dto)
  }
}
