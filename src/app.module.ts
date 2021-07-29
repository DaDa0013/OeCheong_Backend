import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as Joi from 'joi'; //타입스크립트나 NestJS로 되어있지 않을때 패키지 import
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';


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
        SECRET_KEY: Joi.string().required(), //token 지정을 위해 사용하는 privateKey
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
    GraphQLModule.forRoot({
      autoSchemaFile: true,  //root module 설정
    }),
    UsersModule,
    CommonModule,
    JwtModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
