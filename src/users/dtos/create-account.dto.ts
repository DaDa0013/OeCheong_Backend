//dto 2개 -> create account의 입력과 출력

import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class CreateAccountInput extends PickType(User, [
    'email',
    'studentId',
    'password', 
    'role'
]) {}//pickType의 class에 User와 우리가 가지고 싶은 거

@ObjectType()
export class CreateAccountOutput extends CoreOutput{}
