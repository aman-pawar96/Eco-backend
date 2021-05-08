import { Response } from 'express';
import { EmitResult } from 'typescript';
import service from './manageTasks_service'

export const createTask=(
    req:any,
    res:Response
)=>{
    try{
        const response =service.createnewTask(req.userName,req.body);
        if(response['success']){
            res.status(200).send({
                message:"Task added Successfully"
            })
        }
        else{
            res.status(200).send({
                message:"Failed to add task"
            })
        }

    }catch(e){
        res.status(e.status || 500).send({
            status: e.status || 500,
            code: e.status ? e.code : 'UNKNOWN_ERROR',
            error: e.status ? e.message : 'Something went wrong',
          });
    }
};

export const deleteTaskbyId=(
    req:any,
    res:Response
)=>{
    try{
        console.log(req.params);
        var result =service.deleteTask(req.userName,parseInt(req.params.id));
        if(result.success){
            res.status(200).send({
                message:"Task Deleted successfully"
            })
        }
        else{
            res.status(400).send({
                meassage: "Failed to delete Task"
            })
        }
    }catch(e){
        res.status(e.status || 500).send({
            status: e.status || 500,
            code: e.status ? e.code : 'UNKNOWN_ERROR',
            error: e.status ? e.message : 'Something went wrong',
          });
    }
};

export const getTasks=(
    req:any,
    res:Response
)=>{
    try{
        const data=service.fetchTasks(req.userName);
        res.status(200).send(data);
    }catch(e){
        res.status(e.status || 500).send({
            status: e.status || 500,
            code: e.status ? e.code : 'UNKNOWN_ERROR',
            error: e.status ? e.message : 'Something went wrong',
          });
    }
};

export const updateStatusbyId=(
    req:any,
    res:Response
)=>{
    try{
        var response=service.updateStatus(parseInt(req.params.id),req.body.status,req.userName);
        if(response.success){
            res.status(200).send({
                message:'Status updated Successfully'
            });
        }
        else{
            res.status(200).send({
                message:'Failed to update Status'
            });
        }
    }catch(e){
        res.status(e.status || 500).send({
            status: e.status || 500,
            code: e.status ? e.code : 'UNKNOWN_ERROR',
            error: e.status ? e.message : 'Something went wrong',
          });
    }
}