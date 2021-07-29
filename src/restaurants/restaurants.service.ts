import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService{
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        ){} //Restaurant entity의 repository를 inject하는 것, 이름은 restaurants이고 class는 Restaurant entity를 가진 repository (this.restaurants.__ 으로 접근 가능해짐 )
    getAll():Promise<Restaurant[]>{ //find는 async method이므로 Promise를 써줘야함
        return this.restaurants.find();
    }

    createRestaurant(createRestaurantDto:CreateRestaurantDto):Promise<Restaurant>{
        const newRestaurant=this.restaurants.create(createRestaurantDto);//code에만 존재하고 DB에 실제로 저장되지는 않음 
        return this.restaurants.save(newRestaurant);
    }

    upadteRestaurant({id,data}:UpdateRestaurantDto){
        return this.restaurants.update(id,{...data});
    }//첫번쨰 argument :search하는 것 (id를 가진 애 search)
}