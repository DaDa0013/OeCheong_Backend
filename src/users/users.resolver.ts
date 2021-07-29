
import { Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput} from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Query(returns => Boolean)//graphQL 루트 만들기
    hi(){
        return true;
    }

    @Mutation(returns =>CreateAccountOutput)
    async createAccount(
        @Args("input") createAccountInput: CreateAccountInput,
    ): Promise <CreateAccountOutput>{ //createAccountInput이라는 input type만듦
        try{
            return this.usersService.createAccount(createAccountInput);
        } catch(error) {
            //에러 발생시
            return{
                error,
                ok: false,
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput ): Promise<LoginOutput>{//input Arguments 필요
        try {
            return  this.usersService.login(loginInput) //loginInput 저장
        } catch(error){
            return{
                ok: false,
                error,
            };
        }
    }
}