import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';

import jwt from "jsonwebtoken"
const prisma=new PrismaClient();

const createToken = (email:any)=>{
    let token= jwt.sign({id:email},process.env.JWT_SECRET || "");
    return `Bearer ${token}`
}

export const studentRegister=async(req:any,res:any)=>{
    try{
        const {name,email,password}=req.body;
       
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        await prisma.student.create({
            data:{
                name,
                email,
                password:hashedPass
            }

        })
        const token=createToken(email)
        return res.status(200).json({token})



    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"error"})
    }
}


export const studentLogin=async(req:any,res:any)=>{
    try{
        const {email,password}=req.body
        const student=await prisma.student.findUnique({
            where:{
                email
            }
        })
        if(!student)
        {
            return res.status(500).json({msg:"error"})
        }
        const verifyPass = await bcrypt.compare(password,student.password);
        if(!verifyPass){
            return res.status(500).json({message:"Invalid Password"})
        }

        const token=createToken(email);
        return res.status(200).json({token})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:err})
    }
    
}

const bucket_name = process.env.BUCKET_NAME;
const bucket_region = process.env.BUCKET_REGION;
const access_key = process.env.ACCESS_KEY;
const secret_key = process.env.SECRET_ACCESS_KEY;

if (!bucket_name || !bucket_region || !access_key || !secret_key) {
  throw new Error("Missing environment variables");
}

const s3Client = new S3Client({
  region: bucket_region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});
const upload = multer({ storage: multer.memoryStorage() });


const uploadToS3 = async (file: Express.Multer.File, folder: string) => {
    const params = {
      Bucket: bucket_name,
      Key: `${folder}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      return `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/${folder}/${file.originalname}`;
    } catch (err) {
      console.log("S3 upload error:", err);
      throw new Error("Error uploading file to S3");
    }
  };

  export const addDetails = async (req: any, res: any): Promise<Response> => {
    try {
      const formData = req.body.formData || {};
      const {
        studentType,
        dob,
        annualIncome,
        schoolName,
        schoolLocation,
        score,
        grade,
        sscGrade,
        degree,
        discipline,
        gpa,
        hscGrade,
        ugcgpa,
        startYear,
        endYear,
        gender,
        achievements,
        fatherName,
        motherName,
        fatherOccupation,
        motherOccupation,
        guardianName,
        guardianOccupation,
        parentContactNo,
        contactNo,
        sscschoolname,sscschoolloation,hscschoolname,hscschoollocation,
        ugcollegename,ugcollegelocation,pgcollegename,pgcollegelocation
      } = formData;
  
      // Upload files to S3
      const bonafideUrl = req.files?.bonafide ? await uploadToS3(req.files.bonafide[0] as Express.Multer.File, 'documents') : null;
      const incomeCertificateUrl = req.files?.incomecertificate ? await uploadToS3(req.files.incomecertificate[0] as Express.Multer.File, 'documents') : null;
      const salarySlipUrl = req.files?.salaryslip ? await uploadToS3(req.files.salaryslip[0] as Express.Multer.File, 'documents') : null;
      const annualCardUrl = req.files?.annualCard ? await uploadToS3(req.files.annualCard[0] as Express.Multer.File, 'documents') : null;
      const sscMarksheetUrl = req.files?.sscMarksheet ? await uploadToS3(req.files.sscMarksheet[0] as Express.Multer.File, 'documents') : null;
      const hscMarksheetUrl = req.files?.hscMarksheet ? await uploadToS3(req.files.hscMarksheet[0] as Express.Multer.File, 'documents') : null;
      const ugDegreeCertificateUrl = req.files?.ugDegreeCertificate ? await uploadToS3(req.files.ugDegreeCertificate[0] as Express.Multer.File, 'documents') : null;
      const aadhaarCardUrl = req.files?.aadhaarCard ? await uploadToS3(req.files.aadhaarCard[0] as Express.Multer.File, 'documents') : null;
      const rationCardUrl = req.files?.rationCard ? await uploadToS3(req.files.rationCard[0] as Express.Multer.File, 'documents') : null;
      const firstGraduateUrl = req.files?.firstGraduate ? await uploadToS3(req.files.firstGraduate[0] as Express.Multer.File, 'documents') : null;
  
      await prisma.$transaction(async (tx) => {
        await tx.studentDetails.create({
          data: {
            studemail: req.headers.email as string,
            currentQualifications: studentType,
            gender,
            annualIncome: parseInt(annualIncome, 10),
            dob,
            achievements,
            fatherName: fatherName || null,
            motherName: motherName || null,
            fatherOccupation: fatherOccupation || null,
            motherOccupation: motherOccupation || null,
            gaurdianName: guardianName || null,
            gaurdianOccupation: guardianOccupation || null,
            parentContactNo: parentContactNo,
            contactNo: contactNo,
            aadharCard: aadhaarCardUrl,
            rationCard: rationCardUrl,
            firstGraduate: firstGraduateUrl,
            bonafide: bonafideUrl,
            incomecertificate: incomeCertificateUrl,
            salaryslip: salarySlipUrl,
          },
        });
  
        if (studentType === 'Secondary') {
          await tx.secondaryStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              schoolname: schoolName,
              schoollocation: schoolLocation,
              score: parseFloat(score),
              grade,
              annualcard: annualCardUrl,
            },
          });
        } else if (studentType === 'HSC') {
          await tx.hSCStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              sscschoolname: sscschoolname,
              sscschoollocation:sscschoolloation,
              schoolname: hscschoolname,
              schoollocation: hscschoollocation,
              sscgrade: parseFloat(sscGrade),
              sscmarksheet: sscMarksheetUrl,
            },
          });
        } else if (studentType === 'Undergraduate') {
          await tx.uGCollegeStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              degree,
              discipline,
              sscschoolname:sscschoolname,
              sscschoollocation:sscschoolloation,
              hscschoolname:hscschoolname,
              hscschoollocation:hscschoollocation,
              collegename: ugcollegename,
              collegelocation: ugcollegelocation,
              sscgrade: parseFloat(sscGrade),
              sscmarksheet: sscMarksheetUrl,
              hscgrade: parseFloat(hscGrade),
              hscmarksheet: hscMarksheetUrl,
              gpa,
              styear: parseInt(startYear, 10),
              endyear: parseInt(endYear, 10),
            },
          });
        } else if (studentType === 'Postgraduate') {
          await tx.pGCollegeStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              degree,
              discipline,
              sscschoolname:sscschoolname,
              sscschoollocation:sscschoolloation,
              hscschoolname:hscschoolname,
              hscschoollocation:hscschoollocation,
              ugcollegename:ugcollegename,
              ugcollegelocation:ugcollegelocation,
              collegename: pgcollegename,
              collegelocation: pgcollegelocation,
              hscgrade:hscGrade,
              sscgrade:sscGrade,
              ugcgpa,
              styear: parseInt(startYear, 10),
              endyear: parseInt(endYear, 10),
              ugdegreecertificate: ugDegreeCertificateUrl,
            },
          });
        }
      });
  
      return res.status(200).json({ msg: 'done' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'error' });
    }
  };

export const getScholarships=async(req:any,res:any)=>{
    try{
        const scholarships = await prisma.scholarship.findMany({
            where: {
              NOT: {
                appliedScholarship: {
                  some: {
                    studentid: req.headers.id
                  }
                }
              }
            },
            include: {
              appliedScholarship: true 
            }
          });

        return res.status(200).json({scholarships})

    }
    catch{
        return res.status(500).json({msg:"error"})
    }
}


export const getScholarship=async(req:any,res:any)=>
{
    try{
        const id=parseInt(req.query.id);
        const scholarship=await prisma.scholarship.findUnique({
            where:{
                id
            },
            include:{
                admin:true
            }
        })
        return res.status(200).json({scholarship})
    }
    catch{
        return res.status(500).json({msg:"error"})


    }
}

export const applyScholarship=async(req:any,res:any)=>{
    try{
        const id=parseInt(req.query.id);
        await prisma.scholarshipApplied.create({
            data:{
                studentid:req.headers.id,
                scholarshipid:id,
                status:"pending"
            }
        })
        return res.status(200).json({msg:"done"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:'error'})
    }
}


export const getProfile=async(req:any,res:any)=>{
    try{
        const id=req.headers.id;
        const profile=await prisma.student.findUnique({
            where:{
                email:id
            },
            include:{
                studentdetails:true,
                secondarystudentDetails:true,
                hscstudentdetails:true,
                ugcollegestudentdetails:true,
                pgcollegestudentdetails:true,
                appliedscholarships:true
            }
        })
        return res.status(200).json({profile})
    }
    catch{
        return res.status(500).json({msg:"error"})
    }
}




