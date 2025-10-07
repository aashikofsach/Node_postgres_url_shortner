import express from 'express';
import { handlerUserSignup } from '../controllers/userSignup.js';

const router = express.Router() ;

router.post('/', handlerUserSignup)

export default router ;