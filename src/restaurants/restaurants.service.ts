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
        ){}//repository(restaurants)를 inject하기

        getAll(): Promise<Restaurant[]>{//모든 restaurant를 가져오는 service
            return this.restaurants.find();  //restaurants는 restaurant entity의 repository
        }

        createRestaurant(
            createRestaurantDto: CreateRestaurantDto,
        ): Promise<Restaurant>{//return 타입이 restaurant
            const newRestaurant = this.restaurants.create(createRestaurantDto);//새로운 instance를 만든 것으로, DB는 전혀 건들지 않음
            return this.restaurants.save(newRestaurant);//save method로 DB에 저장
        }
        updateRestaurant({id, data}:UpdateRestaurantDto){
            return this.restaurants.update(id, {...data}); //update하고 싶은 entity의 field 보내야함 & 저기엔 update 하고 싶은 object의 id 넣기
        } //저 id를 가진 Restaurant를 update
        //update()sms db에 해당 entity가 있는지 확인 안함
    }