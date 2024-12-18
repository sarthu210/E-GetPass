import { Router } from 'express';
import { SignUp } from "../controller/user.controller.js";
import { LogIn } from '../controller/user.controller.js';
import { getUser } from '../controller/user.controller.js';
import { refreshAccessToke } from '../controller/user.controller.js';
import { getStudents } from '../controller/user.controller.js';
import { SendOtp } from '../controller/user.controller.js';
import { VerifyOtp } from '../controller/user.controller.js';
import verifyHandler from '../middleware/auth.middleware.js';

const routes = new Router();

routes.post('/sign-up', SignUp);
routes.post('/sign-in', LogIn);
routes.post('/refresh-token', refreshAccessToke);
routes.get('/user', getUser);
routes.post('/get-stud' , getStudents);
routes.post('/send-otp', SendOtp);
routes.post('/verify-otp', VerifyOtp);

export default routes;

