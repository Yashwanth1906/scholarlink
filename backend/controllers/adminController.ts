import { PrismaClient } from "@prisma/client"
const prisma=new PrismaClient();
import bcrypt from "bcrypt"
import { rmSync } from "fs";
import jwt from "jsonwebtoken"


const createToken = (email:any)=>{
    let token= jwt.sign({id:email}, "student");
    return `Bearer ${token}`
}

export const adminReg=async(req:any,res:any)=>{
    try{
        const {email,password,orgname}=req.body
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        const admin=await prisma.admin.create({
            data:{
                email,
                password:hashedPass,
                orgname
            }
        })
        const token=createToken(admin.email)

        return res.status(200).json({token})



    }
    catch(err)
    {
        return res.status(500).json({msg:"error"})
    }

}

export const adminLogin=async(req:any,res:any)=>{
    try{

    const {email,password}=req.body
    const admin=await prisma.admin.findUnique({
        where:{
            email
        }
    })
    if(!admin)
    {
        return res.status(500).json({msg:"error"})
    }
    const verifyPass = await bcrypt.compare(password,admin.password);
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


export const createScholarship = async(req:any,res:any)=>{
    try{
        console.log(req.body)
    const {name,gender,annualIncome,studentType,community,prizeAmount,duration,regStartDate,regEndDate,description,procedures} =req.body;
    let scholarshipfor=[gender,annualIncome,studentType,community]
    

    const scholarship=await prisma.scholarship.create({
        data:{
            name,
            providedby:req.headers.email,
            scholarshipfor,
            likes:0,
            amt:parseInt(prizeAmount),
            regstdate:regStartDate,
            regenddate:regEndDate,
            description,
            procedures,
            period:parseInt(duration)
        }
    })
    return res.status(200).json({msg:"done"})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({msg:"eroor"})
    }
}

export const registeredApplicants = async(req:any,res:any) =>{
    try{
        const {scholarshipId} = req.body;
        const registered = await prisma.scholarshipApplied.findMany({
            where:{
                scholarshipid:scholarshipId
            },select:{
                student:{
                    select:{
                        name:true,
                        email:true,
                        studentdetails:{
                            select:{
                                currentQualifications:true,
                                gender:true,
                                annualIncome:true,
                                dob:true,
                                bonafide:true,
                                incomecertificate:true,
                                salaryslip:true,
                                achievements:true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json({students:registered})
    }catch(err){
        console.log(err);
        res.status(500).json({message:err})
    }
}

export const showOngoingScholarships=async(req:any,res:any)=>{
    try{
        const scholarships=await prisma.scholarship.findMany({
            where:{
                providedby:req.headers.email,
                regstdate:{lte:new Date().toISOString().substring(0,10)},
                regenddate:{gte:new Date().toISOString().substring(0,10)}
            },
            include:{
                appliedScholarship:true
            }
        })

        return res.status(200).json({scholarships})
    }
    catch(err)
    {
        return res.status(500).json({msg:"error"})
    }
}

export const showCompletedScholarships=async(req:any,res:any)=>{
    try{
        const scholarships=await prisma.scholarship.findMany({
            where:{
                providedby:req.headers.email,

                regenddate:{lt:new Date().toISOString().substring(0,10)}
            },
            include:{
                appliedScholarship:true
            }
        })

        return res.status(200).json({scholarships})
    }
    catch(err)
    {
        return res.status(500).json({msg:"error"})
    }
}


export const viewDetails=async(req:any,res:any)=>{
    try{
        const id=parseInt(req.query.id);
        const details=await prisma.scholarship.findUnique({
            where:{
                id
            },
            include:{
                appliedScholarship:{
                    include:{
                        student:{
                            include:{
                                studentdetails:true
                            }
                        }
                    }
                },
                admin:true
            }

        })

        return res.status(200).json({details})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"error"})
    }



}

export const getProfile=async(req:any,res:any)=>{
    try{
        const email=req.query.email;
        const student=await prisma.student.findUnique({
            where:{
                email
            },
            include:{
                studentdetails:true,
                secondarystudentDetails:true,
                hscstudentdetails:true,
                ugcollegestudentdetails:true,
                pgcollegestudentdetails:true,
            }
        })

        return res.status(200).json({student})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"eroor"})
    }


}