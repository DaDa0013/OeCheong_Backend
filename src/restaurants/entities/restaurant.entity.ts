import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//클래스 하나로 graphAL schema와 DB에 저장되는 실제 데이터 형식을 만들 수 있음
//DB에 model 생성, 자동으로 graphQL에 스키마 작성

@InputType({ isAbstract: true })//InputType이 스키마에 포함되지 않도록
@ObjectType() //GraphQL을 위한 ObjectType
@Entity()//TypeORM을 위한 Entity
export class Restaurant{//Restaurant을 위한 object type 생성
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number;
    
    @Field(type => String)//GraphQL
    @Column()//TypeORM
    @IsString()
    @Length(5)
    name: string;


}