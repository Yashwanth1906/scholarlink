import {Router} from "express"
import { addDetails, applyScholarship, getProfile, getScholarship, getScholarships, scholarshipView, studentLogin, studentRegister } from "../controllers/studentController";
import { authMiddleware } from "../middleware/auth";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });


const uploadFields = upload.fields([
  { name: 'bonafide', maxCount: 1 },
  { name: 'incomeCertificate', maxCount: 1 },
  { name: 'salarySlip', maxCount: 1 },
  { name: 'annualCard', maxCount: 1 },
  { name: 'sscMarksheet', maxCount: 1 },
  { name: 'hscMarksheet', maxCount: 1 },
  { name: 'ugDegreeCertificate', maxCount: 1 },
  { name: 'aadhaarCard', maxCount: 1 },
  { name: 'rationCard', maxCount: 1 },
  { name: 'firstGraduateCertificate', maxCount: 1 },
]);


export const studentRouter=Router();


studentRouter.post("/register",studentRegister)
studentRouter.post("/login",studentLogin)
studentRouter.post("/addinformation",authMiddleware,uploadFields,addDetails)
studentRouter.get("/scholarships",authMiddleware,getScholarships)
studentRouter.get("/scholarship",authMiddleware,getScholarship)
studentRouter.post("/applyscholarship",applyScholarship)
studentRouter.get("/getprofile",getProfile)
studentRouter.get("/scholarshipview",scholarshipView)