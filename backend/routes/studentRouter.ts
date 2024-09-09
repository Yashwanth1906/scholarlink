import {Router} from "express"
import { studentLogin, studentRegister } from "../controllers/studentController";

export const studentRouter=Router();


studentRouter.post("/register",studentRegister)
studentRouter.post("/login",studentLogin)
studentRouter.post("/profiledetails",

)


