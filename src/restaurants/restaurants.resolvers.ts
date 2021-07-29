
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";


@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService){}
    @Query(returns => [Restaurant]) //리턴 restaurant array
    restaurants(): Promise<Restaurant[]> { //veganOnly라는 argument 호출
        return this.restaurantService.getAll();   
    }
    @Mutation(returns => Boolean)
    async createRestaurant( //arguments 만들기
        @Args('input') createRestaurantDto: CreateRestaurantDto
    ): Promise<boolean> { //async 사용시 promise와 value 써야함
        try { //restaurant가 잘 생성되는지 try, catch로 판단
            await this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        }
        catch(e){
            console.log(e)
            return false;
        }
    }

    @Mutation(returns => Boolean) //UpdateRestaurantDto 합쳐줘서 InputType 필요 없음 & ArgsType만 필요
    async updateRestaurant(
        @Args('input') updateRestaurantDto: UpdateRestaurantDto,
        ) : Promise<boolean>{
        try {
            await this.restaurantService.updateRestaurant(updateRestaurantDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    
}
