import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/users.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
        ){} //injectable일때만 inject할 수 있음
    async use(req:Request, res: Response, next:NextFunction){
        if("x-jwt" in req.headers){
            const token =(req.headers["x-jwt"]);
            const decoded = this.jwtService.verify(token.toString());
            if(typeof decoded ==="object" && decoded.hasOwnProperty('id')){
                try{
                    const user = await this.userService.findById(decoded['id']);
                    req['user'] = user; // HTTP request
                }
                catch(e){

                }
            }
        }
        next();
    }
} //NestMiddleware로 부터 상속 -> interface처럼 행동
