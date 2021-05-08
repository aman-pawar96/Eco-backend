import { NextFunction, Response } from 'express';
import fs from 'fs';
import path from 'path'

const auth=(type= 'none') =>{
    return async(
        req:any,
        res:Response,
        next:NextFunction
    ):Promise<any>=>{
        try{
            var AuthToken=req.get('Authorization');
            const data=fs.readFileSync(path.join(__dirname,'../../data/data.json'),'utf-8')
            const fileData= JSON.parse(data.toString());
            const Users= Object.keys(fileData['tokens']);
            AuthToken=AuthToken.replace("Bearer ","");
            var validUser=false;
            var userName="";
            for(var i=0;i<Users.length;i++){
                if(fileData['tokens'][Users[i]]===AuthToken){
                    userName=Users[i];
                    validUser=true;
                    break;
                }
            }
            if(validUser){
                req.userName=userName;
                next();
            }
            else{
                return res.status(404).send({
                    message:"Unauthorized User"
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
}

export default auth