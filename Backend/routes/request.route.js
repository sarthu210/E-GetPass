import { Router } from 'express';
import { createRequest } from '../controller/request.controller';
import { RequestApproval } from '../controller/request.controller';
import { getAllRequest } from '../controller/request.controller';

const routes = new Router();

routes.post("/creat-request" , createRequest);
routes.post("/approve-request" , RequestApproval);
routes.post("/get-requests" , getAllRequest);

export default routes;