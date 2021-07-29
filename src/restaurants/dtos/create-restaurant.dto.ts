import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Restaurant } from "../entities/restaurant.entity";

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ["id"],InputType) {}
//Restaurant는 objectType인데 omittype은 InputType허용 => 2번째 인자로 decorator 전달해주면 그 decorator로 변환시켜줌 