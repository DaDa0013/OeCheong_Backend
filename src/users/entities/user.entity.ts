import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerError } from "http-errors";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum, IsString } from "class-validator";

enum UserRole {
    Member, //0
    Manager, //1
}

registerEnumType(UserRole, {name: "UserRole"}); //graphQL enum type만들기 

@InputType({ isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity{ //CoreEntity로 extend -> 모든 entities는 core.entity.ts에서 extends됨
    @Column()
    @Field(type=>String)
    @IsEmail()
    email: string;

    @Column()
    @Field(type=>String)
    password: string;

    @Column()
    @Field(type=>String)
    name: string;

    
    @Column( { type: 'enum', enum : UserRole}) //데이터베이스에 type이 enum인 UserRole
    @Field(type=> UserRole) //type이 UserRole인 graphQL
    @IsEnum(UserRole)
    role: UserRole; 


    @BeforeInsert()//DB에 저장하기 전에 password hash해주기
    async hashPassword(): Promise<void> {
        try{
        this.password = await bcrypt.hash(this.password, 10); //hash round는 10으로
        } catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(aPassword:string): Promise<boolean>{
        try{
            const ok = await bcrypt.compare(aPassword , this.password) //같은지 확인
            return ok;
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}