import { Injectable } from "@nestjs/common";

@Injectable({}) //it means it's going to be able to use dependency injection
export class AuthService{
    signup(){
        return {msg:"I have signed up"};
    }
    signin(){
        return {msg:"I have signed in"};
    }
}