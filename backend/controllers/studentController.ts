import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
const prisma=new PrismaClient();

const createToken = (email:any)=>{
    let token= jwt.sign({email},process.env.JWT_SECRET || "");
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



export const addDetails=async(req:any,res:any)=>{
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

}


