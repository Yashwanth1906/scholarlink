import  jwt from "jsonwebtoken"



export const authMiddleware=async(req:any,res:any,next:any)=>{

    const token=req.headers.authorization.split(" ")[1];
    console.log(token)
    try{
        const data=jwt.verify(token,"student") ;
        console.log(data);
        req.headers.email=data.id;
        return next();
    }
    catch(err){
        console.log(err)
    }




}
