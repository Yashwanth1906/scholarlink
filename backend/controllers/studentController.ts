import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { rmSync } from "fs";
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



const addDetails=async(req:any,res:any)=>{
    try{
        const {currentQualifications,gender,annualIncome,dob,bonafide,incomecertificate,salaryslip,achievements}=req.body
        await prisma.$transaction(async(tx)=>{
            await tx.studentDetails.create({
                data:{
                    studemail:req.headers.email,
                    currentQualifications,
                    gender,
                    annualIncome,
                    dob,
                    bonafide,
                    incomecertificate,
                    salaryslip,
                    achievements

                }
            })


            if(currentQualifications==="Secondary")
            {
                const {schoolname,schoollocation,score,annualScore,annualcard,grade}=req.body
                await tx.secondaryStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        schoolname,
                        schoollocation,
                        score,
                        annualScore,
                        annualcard,
                        grade
                    }
                })
            }
            else if(currentQualifications==="HSC")
            {
                const {schoolname,schoollocation,sscgrade,sscmarksheet}=req.body
                await tx.hSCStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        schoolname,
                        schoollocation,
                        sscgrade,
                        sscmarksheet
                    }
                })
            }
            else if(currentQualifications==="UG")
            {   
                const {degree,discipline,collegename,collegelocation,sscgrade,sscmarksheet,hscgrade,hscmarksheet,gpa,styear,endyear}=req.body
                await tx.uGCollegeStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        degree,
                        discipline,
                        collegename,
                        collegelocation,
                        sscgrade,
                        sscmarksheet,
                        hscgrade,
                        hscmarksheet,
                        gpa,
                        styear,
                        endyear
                    }
                })




            }
            else if(currentQualifications==="PG")
            {   
                const {degree,discipline,collegename,collegelocation,ugcgpa,degreecertificate,styear,endyear}=req.body
                await tx.pGCollegeStudentDetails.create({
                    data:{
                        emailId:req.headers.email,
                        degree,
                        discipline,
                        collegename,
                        collegelocation,
                        ugcgpa,
                        degreecertificate,
                        styear,
                        endyear
                    }
                })
            }
        })
        
        return res.status(200).json({msg:"done"})
        

    }
    catch{
        return res.status(500).json({msg:"error"})
    }

}


