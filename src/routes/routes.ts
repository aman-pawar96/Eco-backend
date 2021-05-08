import express from 'express';
import loginRoute from '../api/user/user_routes'
import taskRoute from '../api/manageTasks/manageTasks_routes'

const router = express.Router();

router.use('/user',loginRoute);
router.use('/tasks',taskRoute);

export default router;