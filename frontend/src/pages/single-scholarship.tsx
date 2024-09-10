

import { useEffect, useState } from 'react'
import { motion, } from 'framer-motion'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, DollarSign, Users, ThumbsUp, Calendar, Clock, Book, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import {Link, useSearchParams} from "react-router-dom"
import { BACKEND_URL } from '../../config'
import axios from 'axios'

type scholarship={
  
    "id": number,
    "name": string,
    "providedby": number,
    "scholarshipfor": string[],
    "likes": number,
    "amt": number,
    "regstdate": string,
    "regenddate": string,
    "description": string,
    "procedures": string[],
    "admin": {
            "id": number,
            "email": string,
            "password": string,
            "orgname": string
        }
}


export function SingleScholarship() {
  //@ts-ignore
  const [scholarship,setScholarship]=useState<scholarship>({})
  const [search,]=useSearchParams();
  const [isDialogOpen,setIsDialogOpen]=useState<boolean>();
  const [loading,setLoading]=useState<boolean>(true)


  useEffect(()=>{
    console.log("hello")
    axios.get(`${BACKEND_URL}/api/student/scholarship?id=${search.get("id")}`,{
      headers:
      {
        Authorization:localStorage.getItem("studenttoken")
      }
    }).then((data)=>{
      setScholarship(data.data.scholarship)
      console.log(data.data);
      setLoading(false)

    })
},[])

  const handleApply=()=>{
    setIsDialogOpen(true)
  }

  const handleSubmit=async ()=>{
    try{
      const res=await axios.post(`${BACKEND_URL}/api/student/applyscholarship?id=${search.get("id")}`,{},{
        headers:{
          Authorization:localStorage.getItem("studenttoken")
        
        }
      })
      console.log(res);
    }
    catch(err){
      alert("error")

    }


  }


  if(loading)
  {
    return(
      <>
        Loading..
      </>
    )
  }


  return (
    <div className="min-h-screen w-screen absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scholarships">Scholarships</NavLink>
            <NavLink href="/my-profile">My Profile</NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Scholarship Image"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          /> */}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          {scholarship.name}
        </motion.h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">{scholarship.name}</CardTitle>
            <CardDescription className="text-lg text-gray-600">Provided by: {scholarship.admin.orgname}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InfoItem icon={<Users />} label="Eligibility" value={scholarship.scholarshipfor} />
                <InfoItem icon={<ThumbsUp />} label="Likes" value={scholarship.likes} />
                <InfoItem icon={<DollarSign />} label="Amount" value={`$${scholarship.amt.toLocaleString()}`} />
                <InfoItem icon={<Calendar />} label="Application Deadline" value={scholarship.regenddate} />
                <InfoItem icon={<Clock />} label="Duration" value="1 year" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 mb-4">{scholarship.description}</p>
                <h3 className="text-lg font-semibold mb-2">Renewal Criteria</h3>
                <p className="text-gray-700">{""}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Application Process</h3>
              <ol className="list-decimal list-inside text-gray-700">
                {scholarship.procedures.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {scholarship.scholarshipfor.map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="my-6" />

         

            <div className="mt-8 flex justify-center">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
                onClick={handleApply}
              >
                Apply for Scholarship
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {scholarship.name}</DialogTitle>
            <DialogDescription>
              Please confirm if you want to proceed with your current profile or update it before applying.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 p-4 bg-yellow-100 rounded-md">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Make sure your profile is up-to-date before applying for the scholarship.
            </p>
          </div>
          {/* <div className="space-y-4">
            <h3 className="font-semibold">Application Checklist:</h3>
            <ChecklistItem label="Updated academic information" isChecked={true} />
            <ChecklistItem label="Personal statement" isChecked={false} />
            <ChecklistItem label="Letters of recommendation" isChecked={false} />
          </div> */}
          <DialogFooter className="sm:justify-start">
          <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsDialogOpen(false)
                // Redirect to profile update page
                // You can replace this with actual navigation logic
                console.log("Redirecting to profile update page")
              }}
            >
              Update Profile
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit()}
              className="mr-2"
            >
              Use Current Profile
            </Button>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 ScholarLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
//@ts-ignore
function NavLink({ href, children }) {
  return (
    <Link to={href} className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
      {children}
    </Link>
  )
}
//@ts-ignore
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  )
}
//@ts-ignore
// function ChecklistItem({ label, isChecked }) {
//   return (
//     <div className="flex items-center space-x-2">
//       {isChecked ? (
//         <CheckCircle2 className="w-5 h-5 text-green-500" />
//       ) : (
//         <XCircle className="w-5 h-5 text-red-500" />
//       )}
//       <span className={isChecked ? "text-green-700" : "text-red-700"}>{label}</span>
//     </div>
//   )
// }