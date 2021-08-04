import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType() //graphQL Objecttype안에 만들어져야함
export class CoreOutput{
    @Field(type => String, {nullable:true})
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}