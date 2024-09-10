import {Router}  from "express";
import { adminLogin, adminReg, createScholarship, registeredApplicants } from "../controllers/adminController";
import { authMiddleware } from "../middleware/auth";

export const adminRouter=Router();


adminRouter.post("/register",adminReg)
adminRouter.post("/login",adminLogin)
adminRouter.post("/createscholarship",createScholarship)
adminRouter.post("/appliedstudents",registeredApplicants)