import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule], //because they are not in same folder
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}