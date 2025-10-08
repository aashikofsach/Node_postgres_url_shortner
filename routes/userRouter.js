import express from 'express';
import { handlerUserSignup, handleUserLogin } from '../controllers/userSignup.js';

const router = express.Router() ;

router.post('/', handlerUserSignup)

router.post('/login', handleUserLogin)

export default router ;