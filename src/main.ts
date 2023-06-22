import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({//to ensure the class-validator from dto to works globally in the app
    whitelist:true, //to strip out input we dont want from the request that is not in the dto
  })) 
  await app.listen(3000);
}
bootstrap();
