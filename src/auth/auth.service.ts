import { Injectable } from "@nestjs/common";
import {User, BookApi} from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({}) //it means it's going to be able to use dependency injection
export class AuthService{
    constructor(private prisma:PrismaService){  //because we have injected prismamodule at authmodule

    }
    signup(){
        return {msg:"I have signed up"};
    }
    signin(){
        return {msg:"I have signed in"};
    }
}