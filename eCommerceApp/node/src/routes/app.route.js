import { Router } from 'express';

import usersController from '../controllers/user.controller';

const router = Router();


router.get('/api/getAllcode', usersController._onGetAllcode);

export default router;