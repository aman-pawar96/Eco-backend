import express from 'express'
import {fetchUsers, login} from './user_controller'
import auth from '../../middleware/auth'

const router=express.Router();

router.post('/login',login)
router.get('/fetchotherUsers',auth(),fetchUsers)
export default router;