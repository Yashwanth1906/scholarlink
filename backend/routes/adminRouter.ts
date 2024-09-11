import {Router}  from "express";
import { adminLogin, adminReg, createScholarship, getProfile, registeredApplicants, showCompletedScholarships, showOngoingScholarships, viewDetails } from "../controllers/adminController";
import { authMiddleWare } from "../middleware/auth";

export const adminRouter=Router();


adminRouter.post("/register",adminReg)
adminRouter.post("/login",adminLogin)
adminRouter.post("/createscholarship",authMiddleWare,createScholarship)
adminRouter.post("/appliedstudents",authMiddleWare,registeredApplicants)
adminRouter.get("/ongoing",authMiddleWare,showOngoingScholarships)
adminRouter.get("/completed",authMiddleWare,showCompletedScholarships)
adminRouter.get("/details",authMiddleWare,viewDetails)
adminRouter.get("/getprofile",authMiddleWare,getProfile)