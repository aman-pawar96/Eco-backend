import fs from 'fs'
import path from 'path'

const filePath=path.join(__dirname,'../data/data.json')

export const readFile=()=>{
    const data=fs.readFileSync(filePath,'utf-8')
    const fileData= JSON.parse(data.toString());
    return(fileData);
}

export const writeFile=(
    data:any)=>{
        try{
            fs.writeFileSync(filePath,data);
            return({
                success:true
            })
        }catch(e){
            return({
                success:false
            })
        }
}