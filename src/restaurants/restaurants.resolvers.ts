import {Args, Mutation, Query,Resolver} from '@nestjs/graphql';
import { create } from 'domain';
import { ThrowStatement } from 'ts-morph';
import { CreateRestaurantDto} from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
@Resolver(of=>Restaurant)
export class RestaurantsResolver{
    constructor(private readonly restaurantService:RestaurantService){}
    @Query(returns=>[Restaurant])
    restaurants():Promise<Restaurant[]>{
        return this.restaurantService.getAll();
    }

    @Mutation(returns=>Boolean) 
    async createRestaurant(@Args('input') createRestaurantDto:CreateRestaurantDto):Promise<boolean>{
        try{
            await this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }//resolver에서 createRestaurant를 호출하면 createRestaurantDto를 받음 

    @Mutation(returns=>Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto:UpdateRestaurantDto
    ):Promise<boolean>{
        try{
            await this.restaurantService.upadteRestaurant(updateRestaurantDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}
//typescript 형식 : :Restaurant[]
//graphql 형식: [Restaurant]

