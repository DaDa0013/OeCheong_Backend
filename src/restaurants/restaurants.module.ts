import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { RestaurantResolver } from './restaurants.resolvers';

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])], //entity import , forFeature는 TypeOrmModule이 특정 feature를 import할 수 있게 해줌(여기서 feature는 restaurant)
    providers:[RestaurantResolver, RestaurantService], //class에 inject할 수 있게 RestaurantService 추가
})
export class RestaurantsModule {}
