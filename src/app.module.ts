import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as Joi from 'joi'; //타입스크립트나 NestJS로 되어있지 않을때 패키지 import
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV ==="prod", //production환경일땐 ConfigModule이 환경변수 파일 
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'prod')
          .required(), // 환경변수 유효성 검사
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(), //token 지정을 위해 사용하는 privateKey
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,  //localhost인 경우엔 안써도 됨
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV ==="prod", //production이 아니면 true로
      logging: process.env.NODE_ENV ==="prod", //DB에 돌아가는 모든 로그 확인
      entities:[User],
    }),
    GraphQLModule.forRoot({ //dynamic module로 설정이 존재
      autoSchemaFile: true,  //root module 설정
      context: ({req}) => ({user: req["user"]}), //graphql resolver의 context를 통해 공유
    }),
    UsersModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    AuthModule, //JwtModule처럼 static module은 어떠한 설정도 적용되어 있지않음
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(JwtMiddleware)
      .forRoutes({path:"/graphql", method: RequestMethod.ALL});
  }
}

