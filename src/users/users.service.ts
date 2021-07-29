import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entity/user.entity";
import * as jwt from 'jsonwebtoken';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User) private readonly users: Repository <User>,
        private readonly config:ConfigService,
        private readonly jwtService :JwtService,
    ){
        this.jwtService.hello();
    }

    async createAccount({email,password,role}:CreateAccountInput): Promise<{ ok: boolean; error?: string }>{
        try{
            const exists=await this.users.findOne({email});
            if(exists){
                //make error
                return { ok: false, error: 'There is a user with that email already' };
            }
            await this.users.save(this.users.create({email,password,role}));
            return { ok: true };
        }catch(e){
            //make error
            return { ok: false, error: "Couldn't create account" };
        }
        //check new User
        //create user & hash the password
        
    }

    async login({email,password}:LoginInput):Promise<{ok:boolean; error?:string; token?: string}>{
        //find User with the email
        //check if the pasword is correct
        //make a JWT and give it to the user
        try{
            const user=await this.users.findOne({email});
            if(!user){
                return{
                    ok:false,
                    error:"User not found",
                }
            }
            const passwordCorrect=await user.checkPassword(password); //위에 변수 user이용
            if(!passwordCorrect){
                return{
                    ok:false,
                    error:'Wrong password',
                }
            }
            const token=jwt.sign({id:user.id},this.config.get('SECRET_KEY'));
            return{
                ok:true,
                token,
                 
            }
        }catch(error){
            return{
                ok:false,
                error,
            }
        }
    }
}  