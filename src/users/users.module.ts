import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])], //service는 repository 필요로 하기 떄문에 // ConfigService는 token 생성할 때 import해주려고 users.module안에 configService 추가
    providers:[UsersResolver, UsersService],
})
export class UsersModule {}
