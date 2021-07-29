import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Restaurant } from "../entities/restaurant.entity";

@InputType() //(ArgsType)각각을 분리된 arguments로써 정의 & 분리된 값을 GraphQL argument로 전달
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}//id 제외하고 다 가져오기 &  OmitType은 decorator 바꾸도록 허락
//ObjectType으로 나오는 것을 InputType으로 바꿈
