import {readFile,writeFile} from '../../helper'
import dateFormat from 'dateformat'
import _ from 'lodash'

const createnewTask=(
    userName:any,
    taskDetails:any
)=>{
    var fileData=readFile();
    const taskId= fileData['tasks'][userName]['taskid']+1;
    fileData['tasks'][userName]['taskid']= taskId;
    taskDetails['taskId']=taskId;
    taskDetails['createdBy']=userName;
    taskDetails['createdAt']=dateFormat(new Date(),'dddd, mmmm dd, yyyy, h:MM TT');
    fileData['tasks'][userName]['task'].push(taskDetails);
    return(writeFile(JSON.stringify(fileData)));
};

const deleteTask=(
    userName:any,
    taskId:any
)=>{
    var fileData=readFile();
    var index=-1;
    const taskint= parseInt(taskId);
    for(var i=0;i<fileData['tasks'][userName]['task'].length;i++){
        if(fileData['tasks'][userName]['task'][i]['taskId']===taskint){
            index=i;
            break;
        }
    }
    if(index===-1){
        return({
            success:false,
            message:"No task with task id "+taskId+" exists"
        });
    }
    else{
        fileData['tasks'][userName]['task'].splice(index,1);
        const result=writeFile(JSON.stringify(fileData));
        return({
            success:true,
            message:"No task with task id "+taskId+" exists"
        });
    }
};

const fetchTasks=(
    userName:any
)=>{
    var fileData=readFile();
    var TowriteFile=false;
    var tasks= []
    const currentDate=new Date(dateFormat(new Date(),'dddd, mmmm dd, yyyy, h:MM TT'))
    for(var i=0;i<fileData['tasks'][userName]['task'].length;i++){
        var task= fileData['tasks'][userName]['task'][i]
        if(task.expiresIn && task.status==="Incomplete"){
            const createdDate =new Date(task.createdAt);
            var TimeDiff = Math.abs(currentDate.getTime()-createdDate.getTime())/60000;
            if(TimeDiff>task.expiresIn){
                TowriteFile=true;
                if(task.assignTo){
                    var assigne= task.assignTo;
                    task.status="Transfered to "+task.assignTo;
                    fileData['tasks'][userName]['task'][i]=task;
                    task=_.omit(task,'expiresIn');
                    task=_.omit(task,'assignTo');
                    task.status="Incomplete"
                    const taskId= fileData['tasks'][assigne]['taskid']+1;
                    fileData['tasks'][assigne]['taskid']= taskId;
                    task.taskId=taskId;
                    fileData['tasks'][assigne]['task'].push(task);
                }else{
                    task.status="Expired";
                    fileData['tasks'][userName]['task'][i]=task;
                }
            }
        }
        task=fileData['tasks'][userName]['task'][i]
        tasks.push(task);
    }
    if(TowriteFile){
        writeFile(JSON.stringify(fileData));
    }
    return(tasks);
};

const updateStatus=(
    taskId:any,
    status:any,
    userName:any
)=>{
    var fileData=readFile();
    var updateIndex=-1
    for(var i=0;i<fileData['tasks'][userName]['task'].length;i++){
        if(fileData['tasks'][userName]['task'][i]['taskId']===taskId){
            updateIndex=i;
            break;
        }
    }
    if(updateIndex===-1){
        return({
            success:false
        })
    }
    else{
        fileData['tasks'][userName]['task'][i]['status']=status;
        return(writeFile(JSON.stringify(fileData)));
    }
}

export default {createnewTask,deleteTask,fetchTasks,updateStatus}