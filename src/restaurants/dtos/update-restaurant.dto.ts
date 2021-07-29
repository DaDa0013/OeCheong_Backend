import { ArgsType, Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurant.dto";

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}
//PartialType은  type의 모든 property를 말하지만 옵션사항임
//partialType에서 createRestaurantDto 사용하는 이유가 id 때문

@ArgsType()
export class UpdateRestaurantDto {
    @Field(type => Number)
    id: number;

    @Field(type => UpdateRestaurantInputType)
    data: UpdateRestaurantInputType;
}