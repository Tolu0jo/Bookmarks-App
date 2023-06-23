import { Test } from '@nestjs/testing';
import{ValidationPipe} from '@nestjs/common'
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
     app = moduleRef.createNestApplication();
     app.useGlobalPipes(new ValidationPipe({
      whitelist:true, 
    })
    ); 
  await app.init();
  }); 
  afterAll(() =>{
  app.close(); 
  })


  it.todo('should pass');
});
