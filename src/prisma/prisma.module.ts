import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  //this make the export here avalable through out the app ensure you import it in the app module
@Module({
  providers: [PrismaService],
  exports: [PrismaService]  //EXPORT prisma service to be used in auth module
})
export class PrismaModule {}
