import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // to handle validation
    await app.init();
  });

  it('/auth/register (POST)', () => {
    const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: randomEmail, username: 'testuser', password: 'Test1234' })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('username', 'testuser');
        expect(res.body.user).toHaveProperty('email', randomEmail);
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/login (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', username: 'testuser', password: 'Test1234' });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'Test1234' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('username', 'testuser');
        expect(res.body.user).toHaveProperty('email', 'test@example.com');
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/logout (POST)', async () => {
    // Register and login user first to get the token
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', username: 'testuser', password: 'Test1234' });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'Test1234' });

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
