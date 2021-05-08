import { Response } from 'express';
import service from './user_service'

export const login = async(
    req:any,
    res:Response
)=>{
    try{
        var Result= await service.checkLoginCred(req.body);
        if(Result['success']){
            res.status(200).send({
                message:"Success Login",
                token:Result.token
            })
        }
        else{
            res.status(400).send({
                message:"Invalid Username or Password"
            })
        }
    }catch(e){
        res.status(e.status || 500).send({
            status: e.status || 500,
            code: e.status ? e.code : 'UNKNOWN_ERROR',
            error: e.status ? e.message : 'Something went wrong',
          });
     }
    
}

export const fetchUsers=(
    req:any,
    res:Response
)=>{
    try{
        const users=service.fetchUsersService(req.userName);
        res.status(200).send({
            users:users
        });

    }catch(e){
        res.status(e.status || 500).send({
            status: e.status || 500,
            code: e.status ? e.code : 'UNKNOWN_ERROR',
            error: e.status ? e.message : 'Something went wrong',
        });
    }
}
