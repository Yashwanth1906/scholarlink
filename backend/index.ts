import express from "express"
import cors from "cors"
// import { studentRouter } from "./routes/studentRoute";
// import { adminRouter } from "./routes/adminRoute";
// import { pollRouter } from "./routes/pollRoute";
import { PrismaClient } from "@prisma/client";
import { studentRouter } from "./routes/studentRouter";
import { adminRouter } from "./routes/adminRouter";



const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())
const BACKEND_PORT = process.env.PORT


app.get("/test",async(req,res)=>{


    
})

app.listen(BACKEND_PORT,()=>{
    console.log("Running")
})

app.use("/api/student",studentRouter)
app.use("/api/admin",adminRouter)



app.get("/check",(req,res)=>{
    return res.send("running")
})