import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}

@InputType()
export class DeleteAccountInput extends PartialType(
    PickType(User, ["email","password", "studentId"]),//user에서 email과 password가지고 class 생성 & PartialType으로 optional하게 
){}
