import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {   // prismaclient class allows to connect to database, it has constructor, it connects,disconnects and executes sql
    constructor(){
   super({          //super calls the constructor of prismaclient
    datasources:{
        db:{
         url:"postgresql://postgres:1234@localhost:5434/nest?schema=public"
        }
    }
   })
    }
}
