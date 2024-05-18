import { Router } from "express";
import { dashboard } from "../controllers/dashboard.controller";
import { auth } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";


const router = Router();

router.get('/dashboard',auth,asyncHandler(dashboard));

export default router;