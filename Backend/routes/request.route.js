import { Router } from 'express';
import { createRequest } from '../controller/request.controller.js';
import { RequestApproval } from '../controller/request.controller.js';
import { getAllRequest } from '../controller/request.controller.js';
import { RequestUnapproved } from '../controller/request.controller.js';
import { RequestPerStud } from '../controller/request.controller.js';

const routes = new Router();

routes.post("/creat-request" , createRequest);
routes.post("/approve-request" , RequestApproval);
routes.post("/get-requests" , getAllRequest);
routes.post("/unapprove-request" , RequestUnapproved);
routes.post("/get-requests-by-enrollment" , RequestPerStud)

export default routes;