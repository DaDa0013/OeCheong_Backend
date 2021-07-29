import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { EnumDefinitionFactory } from "@nestjs/graphql/dist/schema-builder/factories/enum-definition.factory";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { fieldToFieldConfig } from "graphql-tools";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Restaurant{
    @PrimaryGeneratedColumn()
    @Field(type=>Number)
    id:number;

    @Field(is=>String)
    @Column()
    @IsString()
    @Length(5)
    name:string;

    @Field(type=>Boolean,{nullable:true})
    @Column({default:true})
    @IsOptional()
    @IsBoolean()
    isVegan?:Boolean;

    @Field(type=>String,{defaultValue:"강남"})
    @Column()
    address:string;

    
}//is는 아무의미없음 () 로 해도 무관 