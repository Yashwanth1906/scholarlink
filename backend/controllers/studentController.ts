import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';

import jwt from "jsonwebtoken"
import { escape } from "querystring";
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
        return res.status(500).json({msg:"errors"})
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

export const addDetails=[
    upload.fields([
        { name: 'bonafide', maxCount: 1 },
        { name: 'incomecertificate', maxCount: 1 },
        { name: 'salaryslip', maxCount: 1 },
        { name: 'annualCard', maxCount: 1 }, 
        { name: 'sscMarksheet', maxCount: 1 },
        { name: 'hscMarksheet', maxCount: 1 },
        { name: 'ugDegreeCertificate', maxCount: 1 },
      ]),    
    async(req:any,res:any)=>{
    try{
        console.log(req.body)
        console.log(req.headers)
        const {studentType,dob,annualIncome,schoolName,schoolLocation,score,annualScore,grade,hscSchoolName,hscSchoolLocation,sscGrade,degree,discipline,collegeName,collegeLocation,gpa,hscGrade,ugcgpa,startYear,endYear,gender,achievements}=req.body.formData
        await prisma.$transaction(async(tx)=>{
            await tx.studentDetails.create({
                data:{
                    studemail:req.headers.email,
                    currentQualifications:studentType,
                    gender,
                    annualIncome:parseInt(annualIncome),
                    dob,
                    achievements

                }
            })


            if(studentType==="Secondary")
            {
              
                await tx.secondaryStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        schoolname:schoolName,
                        schoollocation:schoolLocation,
                        score:parseFloat(score),
                        annualScore,
                        grade
                    }
                })
            }
            else if(studentType==="HSC")
            {
                
                await tx.hSCStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        schoolname:hscSchoolName,
                        schoollocation:hscSchoolLocation,
                        sscgrade:parseFloat(sscGrade),
                 
                    }
                })
            }
            else if(studentType==="Unergraduate")
            {   

                await tx.uGCollegeStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        degree,
                        discipline,
                        collegename:collegeName,
                        collegelocation:collegeLocation,
                        sscgrade:parseFloat(sscGrade),
                        hscgrade:parseFloat(hscGrade),
                        gpa,
                        styear:parseInt(startYear),
                        endyear:parseInt(endYear)
                    }
                })




            }
            else if(studentType==="Postgraduate")
            {   
               
                await tx.pGCollegeStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        degree,
                        discipline,
                        collegename:collegeName,
                        collegelocation:collegeLocation,
                        ugcgpa,
                        styear:parseInt(startYear),
                        endyear:parseInt(endYear)
                    }
                })
            }
        })
        
        return res.status(200).json({msg:"done"})
        

    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"error"})
    }
}];


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
                scholarshipid:id
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




