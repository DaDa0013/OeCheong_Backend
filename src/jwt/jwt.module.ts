import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule{ //DynamicModule은 module을 반환해주는 module
        return {
            module:JwtModule,
            providers: [{
                provide: CONFIG_OPTIONS, //class 대신 value로 대체
                useValue: options, //BANANAS라는 이름의 provider로, value가 option
                },
                JwtService,
            ],
            exports: [JwtService], 
             //원하는 class를 provide할 수 있게 해줌
            // provide:JwtService, useClass:JwtService 함축한것
        };
    }
}
