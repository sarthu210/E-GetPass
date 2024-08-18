import { Router } from 'express';
import { SignUp } from "../controller/user.controller.js";
import { LogIn } from '../controller/user.controller.js';

const routes = new Router();

routes.post('/sign-up', SignUp);
routes.post('/sign-in', LogIn);

export default routes;

