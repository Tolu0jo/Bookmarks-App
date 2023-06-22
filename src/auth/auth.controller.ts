import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";

@Controller("auth")
export class AuthController {
    constructor(private authservice: AuthService){}
    @Post("signup") //"auth/signup"
    signup(@Body()dto:AuthDto) { 
      return this.authservice.signup(dto); 
    }
    @Post("login") //"auth/login"
    signin(@Body()dto:AuthDto){
      return this.authservice.signin(dto) 
    }
}