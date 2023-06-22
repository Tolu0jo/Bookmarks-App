import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {   // prismaclient class allows to connect to database, it has constructor, it connects,disconnects and executes sql
    constructor(config:ConfigService){  //inject config service dependency to assess the env file
   super({          //super calls the constructor of prismaclient
    datasources:{
        db:{
         url: config.get("DATABASE_URL")
        }
    }
   })
    }
}
