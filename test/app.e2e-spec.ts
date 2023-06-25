import { Test } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateBookmarkDto } from '../src/bookmark/dto/create-bookmark-dto';
import { EditBookmarkDto } from '../src/bookmark/dto';



describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(4000);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:4000',
    );
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'email@example.com',
      password: '123 ',
    };
    describe('signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      });
      it('should throw an error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw an error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw an error if nothing is provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });
    });
    describe('signin', () => {
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });
      it('should throw an error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw an error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw an error if nothing is provided', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({})
          .expectStatus(400);
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
    it("should get current user",()=>{
      return pactum
      .spec()
      .get('/users/me')
      .withHeaders({Authorization:`Bearer $S{token}`}) //S should be there
      .expectStatus(200);
    }) 
    });
    describe('Edit User', () => {
      it("should get edit user",()=>{
        const dto:EditUserDto={
          firstName: "John",
          email: "john@example.com"
        }
        return pactum
        .spec()
        .patch('/users')
        .withBody(dto)
        .withHeaders({Authorization:'Bearer $S{token}'}) //S should be there
        .expectStatus(200)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.email);
      }) 
    });
  });


  describe('Bookmarks', () => {
    describe('get bookmarks', () => {
      it("should get bookmark", () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({Authorization:`Bearer $S{token}`}) //S should be there
        .expectStatus(200)
        .inspect();
    });
    });
    describe('create bookmark', () => {
      const dto : CreateBookmarkDto={
         title: "first bookmark",
         link: "http://www.example.com"
      }
      it("should create bookmark", () => {
        return pactum
        .spec()
        .post('/bookmarks')
        .withBody(dto)
        .withHeaders({Authorization:`Bearer $S{token}`}) //S should be there
        .expectStatus(201)
        .inspect()
        .stores("bookmarkId","id"); //to store the bookmarkId created as id to be used for other testing
    });
    });
    describe('get bookmark by id', () => {
      it("should get bookmark", () => {
        return pactum
        .spec()
        .get('/bookmarks/{id}')
        .withPathParams("id", `$S{bookmarkId}`)
        .withHeaders({Authorization:`Bearer $S{token}`}) //S should be there
        .expectStatus(200)
        .expectBodyContains(`$S{bookmarkId}`);
    });
    });
    describe('edit bookmark by id', () => {
      const dto: EditBookmarkDto={
        title: "second bookmark",
        link: "http://www.example.com"
      }
      it("should create bookmark", () => {
        return pactum
        .spec()
        .patch('/bookmarks/{id}')
        .withPathParams("id", `$S{bookmarkId}`)
        .withBody(dto)
        .withHeaders({Authorization:`Bearer $S{token}`}) //S should be there
        .expectStatus(200)
        .inspect()
        .expectBodyContains(dto.link)
        .expectBodyContains(dto.title);
        
    });
    });
    describe('delete bookmark', () => {
      it("should delete bookmark", () => {
        return pactum
        .spec()
        .delete('/bookmarks/{id}')
        .withPathParams("id", `$S{bookmarkId}`)
        .withHeaders({Authorization: `Bearer $S{token}`}) //S should be there
        .expectStatus(204);
        
    });
    });
  });
});
