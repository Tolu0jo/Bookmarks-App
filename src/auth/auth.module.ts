import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";

@Module({
    imports:[PrismaModule,JwtModule.register({})], //because they are not in same folder
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy]
})
export class AuthModule{}