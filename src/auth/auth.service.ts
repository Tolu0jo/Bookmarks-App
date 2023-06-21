import { Injectable } from "@nestjs/common";

@Injectable({}) //it means it's going to be able to use dependency injection
export class AuthService{
    login(){}
    signup(){}
}