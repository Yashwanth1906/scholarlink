import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';

import jwt from "jsonwebtoken"
const prisma=new PrismaClient();

const createToken = (email:any)=>{
    let token= jwt.sign({id:email}, "student");
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
      const {
        studenttype,
        dob,
        annualIncome,
        schoolname,
        schoolLocation,
        score,
        grade,
        sscGrade,
        degree,
        discipline,
        gpa,
        hscGrade,
        ugCgpa,
        stYear,
        endYear,
        gender,
        achievements,
        fatherName,
        motherName,
        fatherOccupation,
        motherOccupation,
        gaurdianName,
        gaurdianOccupation,
        parentContactNo,
        contactNo,
        sscSchoolName,
        sscSchoolLocation,
        hscSchoolName,
        hscSchoolLocation,
        ugCollegename,
        ugCollegeLocation,
        pgCollegeName,
        pgCollegeLocation,
        community
      } = req.body;
      console.log(achievements)
      const [
        bonafideUrl,
        incomeCertificateUrl,
        salarySlipUrl,
        annualCardUrl,
        sscMarksheetUrl,
        hscMarksheetUrl,
        ugDegreeCertificateUrl,
        aadhaarCardUrl,
        rationCardUrl,
        firstGraduateUrl,
      ] = await Promise.all([
        req.files?.bonafide ? uploadToS3(req.files?.bonafide[0] as Express.Multer.File, 'documents') : null,
        req.files?.incomeCertificate ? uploadToS3(req.files?.incomeCertificate[0] as Express.Multer.File, 'documents') : null,
        req.files?.salarySlip ? uploadToS3(req.files?.salarySlip[0] as Express.Multer.File, 'documents') : null,
        req.files?.annualCard ? uploadToS3(req.files?.annualCard[0] as Express.Multer.File, 'documents') : null,
        req.files?.sscMarksheet ? uploadToS3(req.files?.sscMarksheet[0] as Express.Multer.File, 'documents') : null,
        req.files?.hscMarksheet ? uploadToS3(req.files?.hscMarksheet[0] as Express.Multer.File, 'documents') : null,
        req.files?.ugDegreeCertificate ? uploadToS3(req.files?.ugDegreeCertificate[0] as Express.Multer.File, 'documents') : null,
        req.files?.aadhaarCard ? uploadToS3(req.files?.aadhaarCard[0] as Express.Multer.File, 'documents') : null,
        req.files?.rationCard ? uploadToS3(req.files?.rationCard[0] as Express.Multer.File, 'documents') : null,
        req.files?.firstGraduateCertificate ? uploadToS3(req.files?.firstGraduateCertificate[0] as Express.Multer.File, 'documents') : null,
      ]);
  
      // Start transaction
      await prisma.$transaction(async (tx) => {
        // Create student details
        await tx.studentDetails.create({
          data: {
            studemail: req.headers.email as string,
            currentQualifications: studenttype || 'Unknown',
            gender,
            annualIncome: parseInt(annualIncome, 10) || 0,
            dob,
            achievements: achievements || '',
            fatherName: fatherName || null,
            motherName: motherName || null,
            fatherOccupation: fatherOccupation || null,
            motherOccupation: motherOccupation || null,
            gaurdianName: gaurdianName || null,
            gaurdianOccupation: gaurdianOccupation || null,
            parentContactNo: parentContactNo ? parentContactNo  : null,
            contactNo: contactNo ? contactNo : null,
            aadharCard: aadhaarCardUrl || null,
            rationCard: rationCardUrl || null,
            firstGraduate: firstGraduateUrl || null,
            bonafide: bonafideUrl || null,
            incomecertificate: incomeCertificateUrl || null,
            salaryslip: salarySlipUrl || null,
            community: community || 'Unknown',
          },
        });
        console.log("hi")
        if (studenttype === 'Secondary') {
          await tx.secondaryStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              schoolname: schoolname || '',
              schoollocation: schoolLocation || '',
              score: parseFloat(score) || 0,
              grade: grade || '',
              annualcard: annualCardUrl || null,
            },
          });
        } else if (studenttype === 'HSC') {
          await tx.hSCStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              sscschoolname: sscSchoolName || '',
              sscschoollocation: sscSchoolLocation || '',
              schoolname: hscSchoolName || '',
              schoollocation: hscSchoolLocation || '',
              sscgrade: parseFloat(sscGrade) || 0,
              sscmarksheet: sscMarksheetUrl || null,
            },
          });
        } else if (studenttype === 'undergraduate') {
          await tx.uGCollegeStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              degree: degree || '',
              discipline: discipline || '',
              sscschoolname: sscSchoolName || '',
              sscschoollocation: sscSchoolLocation || '',
              hscschoolname: hscSchoolName || '',
              hscschoollocation: hscSchoolLocation || '',
              collegename: ugCollegename || '',
              collegelocation: ugCollegeLocation || '',
              sscgrade: parseFloat(sscGrade) || 0,
              sscmarksheet: sscMarksheetUrl || null,
              hscgrade: parseFloat(hscGrade) || 0,
              hscmarksheet: hscMarksheetUrl || null,
              gpa: gpa || '0',
              styear: parseInt(stYear, 10) || 0,
              endyear: parseInt(endYear, 10) || 0,
            },
          });
        } else if (studenttype === 'Postgraduate') {
          await tx.pGCollegeStudentDetails.create({
            data: {
              emailId: req.headers.email as string,
              degree: degree || '',
              discipline: discipline || '',
              sscschoolname: sscSchoolName || '',
              sscschoollocation: sscSchoolLocation || '',
              hscschoolname: hscSchoolName || '',
              hscschoollocation: hscSchoolLocation || '',
              ugcollegename: ugCollegename || '',
              ugcollegelocation: ugCollegeLocation || '',
              collegename: pgCollegeName || '',
              collegelocation: pgCollegeLocation || '',
              hscgrade: hscGrade || '',
              sscgrade: sscGrade || '',
              ugcgpa: ugCgpa || '0',
              styear: parseInt(stYear, 10) || 0,
              endyear: parseInt(endYear, 10) || 0,
              ugdegreecertificate: ugDegreeCertificateUrl || '',
            },
          });
        }
      });
      console.log("Last")
      return res.status(200).json({ msg: 'Details successfully added' });
    } catch (err) {
      console.error('Error in addDetails:', err);
      return res.status(500).json({ msg: 'Internal server error' });
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
              appliedScholarship: true ,
              admin:true
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
        console.log(req.headers.id)
        await prisma.scholarshipApplied.create({
            data:{
                studentid:req.headers.id,
                scholarshipid:id,
                status:"pending",
                scholarshipEssay:req.body.bestFit
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

export const scholarshipView=async(req:any,res:any)=>{
    try{
        console.log(req.headers.id +"  ***")
        const applied=await prisma.scholarshipApplied.findMany({
            where:{
                studentid:req.headers.id,
                status:"Pending"
            },
            include:{
                scholarship:true,
                student:true
            }
        })
        const completed=await prisma.scholarshipApplied.findMany({
            where:{
                studentid:req.headers.id,
                status:"Completed"
            }
        })

        return res.status(200).json({applied,completed})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"error"})

    }




}




