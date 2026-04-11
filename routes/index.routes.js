import { Router } from 'express';
import { getHelloWorld, getPong, getMarco } from '../controllers/index.controllers.js';

const router = Router();

router.get('/', getHelloWorld);
router.get('/ping', getPong);
router.get('/marco', getMarco);

export default router;
