import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/outputdto";
import { User } from "../entity/user.entity";

@InputType()
export class LoginInput extends PickType(User,["email","password"]){}

@ObjectType()
export class LoginOutput extends MutationOutput{
    @Field(type=>String,{nullable:true})
    token?:string;
}
