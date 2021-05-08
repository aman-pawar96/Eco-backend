import express from 'express';
import auth from '../../middleware/auth';
import {createTask, deleteTaskbyId, getTasks,updateStatusbyId} from './manageTasks_controller'

const router=express.Router();

router.post('/createtask',auth(),createTask);
router.delete('/deletetask/:id',auth(),deleteTaskbyId);
router.get('/tasks',auth(),getTasks);
router.put('/updatetaskstatus/:id',auth(),updateStatusbyId)

export default router;
