import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleWare = async(req:any,res:any,next:any)=>{
    const token = req.headers.authorization.split(" ")[1];
    console.log("token"+token)
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET || "") as JwtPayload;
        console.log("Token:"+token_decode.id);
        req.headers.email = token_decode.id;
        console.log("hello "+req.headers.email);
        next();
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Error in jwt"});
}
}
