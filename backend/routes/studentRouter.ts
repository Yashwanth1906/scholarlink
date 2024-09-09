import {Router} from "express"
import { addDetails, studentLogin, studentRegister } from "../controllers/studentController";
import { authMiddleware } from "../middleware/auth";

export const studentRouter=Router();


studentRouter.post("/register",studentRegister)
studentRouter.post("/login",studentLogin)
studentRouter.post("/addinformation",authMiddleware,addDetails)


