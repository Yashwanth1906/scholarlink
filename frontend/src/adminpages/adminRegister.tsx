import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCapIcon } from 'lucide-react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

export  function AdminRegister() {
  const [orgname,setOrgname]=useState("");
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate =useNavigate()

  const handleSubmit = async() => {
    try{
        const res=await axios.post(`${BACKEND_URL}/api/admin/register`,{
            orgname,
            email,
            password
        })
        console.log(res)
      localStorage.setItem("admintoken", res.data.token)
      navigate("/admin/login")
    }
    catch{
        alert("error")


    }
}

  return (
    <div className="h-screen w-screen bg-purple-100 flex items-center justify-center p-4 absolute left-0 top-0">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <GraduationCapIcon className="h-12 w-12 " />
          </div>
          <CardTitle className="text-2xl font-bold text-center ">Admin Registration</CardTitle>
          <CardDescription className="text-center ">
            Create an account to apply for scholarships
          </CardDescription>
        </CardHeader>
        <div >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" >Organisation Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Jio "
                required
                value={orgname}
                onChange={(e)=>setOrgname(e.target.value)}
                className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" >Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" >Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit}className="w-full  text-white" variant={"student"}>
              Register
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}