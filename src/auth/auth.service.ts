import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto, SigninDto } from '../auth/dto';
import * as argon from 'argon2';


import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable() //it means it's going to be able to use dependency injection
export class AuthService {
  constructor(private prisma: PrismaService,private jwt:JwtService, private config:ConfigService) {
    //because we have injected prismamodule at authmodule
  }
  //=============Signup=============//
  async signup(dto: AuthDto) {
    try {
      //generate hashed password
      const hash = await argon.hash(dto.password);
       const id = uuidv4()
      //save new user in db
      const user = await this.prisma.user.create({
        data: {
          id,
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName
        },
      });
      delete user.hash;

      return this.signToken(user.id,user.email);
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
  };

  //=========Sign in==========//
  async signin(dto: SigninDto) {
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
      return this.signToken(user.id,user.email);
    } catch (error) {
      throw error;
    }
  };
//=============create Token =================//
async signToken(
    userId:string,
    email:string,
): Promise<{access_token:string}>{
    const payload ={
        sub:userId,
        email
    }
    const secret=this.config.get("JWT_SECRET")
    const token = await this.jwt.signAsync(payload,{expiresIn:"3d",secret})

    return {access_token:token}
}



}
