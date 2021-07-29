import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
    static forRoot(): DynamicModule{ //DynamicModule은 module을 반환해주는 module
        return {
            module:JwtModule,
            exports: [JwtService],
            providers: [JwtService],
        };
    }
}
