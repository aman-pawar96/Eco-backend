import fs from 'fs'
import path from 'path'

const checkLoginCred=(
    Cred:any
)=>{
    const data=fs.readFileSync(path.join(__dirname,'../../../data/data.json'),'utf-8')
    const fileData= JSON.parse(data.toString());
    if(fileData['users'][Cred.userName]){
        if(fileData['users'][Cred.userName]===Cred.password){
            return{
                success:true,
                token:fileData['tokens'][Cred.userName]
            }
        }
        else{
            return({
                success:false
            })
        }
    }
    else{
        return({
            success:false
        });
    }
}

const fetchUsersService =(
    userName:string
)=>{
    const data=fs.readFileSync(path.join(__dirname,'../../../data/data.json'),'utf-8')
    const fileData= JSON.parse(data.toString());
    var users =Object.keys(fileData['users']);
    const index=users.indexOf(userName);
    users.splice(index,1);
    return(users);
}

export default {checkLoginCred,fetchUsersService}