import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authservice: AuthService){}
    @Post("signup") //"auth/signup"
    signup(){
        return {msg:"Registered"};
    }
    @Post("login") //"auth/login"
    signin(){
        return "I am signed in.";
    }
}