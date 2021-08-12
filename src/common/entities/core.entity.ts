import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(type=>Number) //graphQL type만들기
    id:number;

    @CreateDateColumn()
    @Field(type=>Date)
    createdAt:Date;

    @UpdateDateColumn()
    @Field(type=>Date)
    updatedAt:Date;

}