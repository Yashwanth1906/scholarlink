import {Router} from "express"
import { addDetails, applyScholarship, getProfile, getScholarship, getScholarships, studentLogin, studentRegister } from "../controllers/studentController";
import { authMiddleware } from "../middleware/auth";

export const studentRouter=Router();


studentRouter.post("/register",studentRegister)
studentRouter.post("/login",studentLogin)
studentRouter.post("/addinformation",authMiddleware,addDetails)
studentRouter.get("/scholarships",authMiddleware,getScholarships)
studentRouter.get("/scholarship",authMiddleware,getScholarship)
studentRouter.post("/applyscholarship",authMiddleware,applyScholarship)
studentRouter.get("/getprofile",authMiddleware,getProfile)
