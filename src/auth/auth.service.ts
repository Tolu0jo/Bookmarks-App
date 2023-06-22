import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable() //it means it's going to be able to use dependency injection
export class AuthService {
  constructor(private prisma: PrismaService) {
    //because we have injected prismamodule at authmodule
  }
  async signup(dto: AuthDto) {
    try {
      //generate hashed password
      const hash = await argon.hash(dto.password);

      //save new user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;

      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credetials taken',
          );
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    try {
      const { email, password } = dto;
      // find user by email

      const user =
        await this.prisma.user.findFirst({
          where: { email},
        });
      // if user does not exist throe exception
      if(!user) throw new ForbiddenException("Credentials incorrect")
      //compare password
       const matchpwd = await argon.verify(user.hash, password)
      //if password does not match throw exception
      if(!matchpwd) throw new ForbiddenException("Credentials incorrect")
      delete user.hash
      return { user, msg: 'Login Successful' };
    } catch (error) {
      throw error;
    }
  }
}
