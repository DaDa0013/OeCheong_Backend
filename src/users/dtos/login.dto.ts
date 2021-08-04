import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class LoginInput extends PickType(User, ["email", "password"]){}


@ObjectType()
export class LoginOutput extends CoreOutput{
    @Field(type => String, { nullable:true }) //token이 없을 수도 있으니 nullable
    token?:string;
}