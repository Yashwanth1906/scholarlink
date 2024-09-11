'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { GraduationCap, DollarSign, Users, ThumbsUp, Calendar, Clock, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BACKEND_URL } from '../../config'

type scholarship={
  
  "id": number,
  "name": string,
  "providedby": string,
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

export  function SingleScholarship() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [bestFit, setBestFit] = useState("")
  const [search,]=useSearchParams();
  const [loading,setLoading]=useState<boolean>(true)
  //@ts-ignore
  const [scholarship, setScholarship] = useState<scholarship>({})
  const navigate=useNavigate();


  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/student/scholarship?id=${search.get("id")}`,{
      headers:{
        Authorization:localStorage.getItem("studenttoken")
      }
    }).then((data)=>{
      setScholarship(data.data.scholarship)
      console.log(data.data)
      setLoading(false)


    })
  
  
  },[])

  const handleApply = () => {
    setIsDialogOpen(true)
  }



  const displayEligibilityCriteria = () => {

    const gender=scholarship.scholarshipfor[0];
    const education=scholarship.scholarshipfor[1];
    const community=scholarship.scholarshipfor[2]
    const incomeLevel=scholarship.scholarshipfor[3];
    return (
      <ul className="list-disc list-inside space-y-2">
        <li>Gender: {gender}</li>
        <li>Education: {education}</li>
        <li>Community: {community}</li>
        <li>Income Level: {incomeLevel}</li>
      </ul>
    )
  }

  const handleSubmit=async ()=>{
    try{
      const res=await axios.post(`${BACKEND_URL}/api/student/applyscholarship?id=${search.get("id")}`,{bestFit},{
        headers:{
          Authorization:localStorage.getItem("studenttoken")
        
        }
      })
      console.log(res);
      setIsDialogOpen(false)
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
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-blue-200 p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-purple-800">{scholarship.name}</CardTitle>
          <CardDescription className="text-lg text-gray-600">Provided by: {scholarship.admin.orgname}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoItem icon={<ThumbsUp />} label="Likes" value={scholarship.likes} />
              <InfoItem icon={<DollarSign />} label="Amount" value={`$${scholarship.amt.toLocaleString()}`} />
              <InfoItem icon={<Calendar />} label="Application Deadline" value={scholarship.regenddate} />
              <InfoItem icon={<Clock />} label="Duration" value="1 year" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{scholarship.description}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-blue-700 mb-2">Please review the eligibility criteria:</p>
                  {displayEligibilityCriteria()}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Why are you the best fit?</h3>
            <Textarea
              placeholder="Explain why you are the best candidate for this scholarship..."
              value={bestFit}
              onChange={(e) => setBestFit(e.target.value)}
              className="w-full h-32"
            />
          </div>

          <div className="flex justify-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={handleApply}
            >
              Apply for Scholarship
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {scholarship.name}</DialogTitle>
            <DialogDescription>
              Please confirm if you want to proceed with your application.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InfoItem({ icon, label, value }:any) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  )
}