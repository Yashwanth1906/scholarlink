'use client'

import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, DollarSign, Users, ThumbsUp, Clock, BookTemplate } from 'lucide-react'
import { format } from 'date-fns'

import { useNavigate } from 'react-router-dom'
import { AdminNavbar } from '@/components/admin-navbar'

import {  useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../../config'


type Scholarship = {
        "id": number,
        "name": string,
        "providedby": string,
        "image": string | null,
        "scholarshipfor": string[],
        "likes": number,
        "amt": number,
        "period": number,
        "regstdate": string,
        "regenddate": string,
        "description": string,
        "procedures":string[],
        "completed": boolean,
        "appliedScholarship": any,
        "admin": {
            "id": number,
            "email": string,
            "password": string,
            "orgname": string
        }
}



export  function ScholarshipDetails() {
  const router = useNavigate()

  const [scholarship, setScholarship] = useState<Scholarship | null>(null)
  const [applicants, setApplicants] = useState([])
  const [search,]=useSearchParams();
  const [loading,setLoading]=useState<boolean>(true)


  useEffect(() => {
   
    const fetchScholarshipDetails = async () => {
     
      const res=await axios.get(`${BACKEND_URL}/api/admin/details?id=${search.get("id")}`);
      setScholarship(res.data.details)
      let temp:any=[]
      res.data.details.appliedScholarship.map((x:any)=>{
        temp.push(x)
      })
 
      setApplicants(temp)
      setLoading(false)
    }


      fetchScholarshipDetails()
     

  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen w-screen absolute top-0 left-0 bg-gradient-to-b from-purple-100 to-blue-200 p-6 md:p-10">
      <AdminNavbar />
      <br></br>
      <br></br>
      <br></br>
      <div className="max-w-4xl mx-auto bg-white rounded-lg  shadow-xl py-80 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold  text-purple-800 mb-6">{scholarship.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><span className="font-medium">Gender:</span> {scholarship.scholarshipfor[0]}</li>
                <li><span className="font-medium">Annual Income:</span> {scholarship.scholarshipfor[1]}</li>
                <li><span className="font-medium">Student Type:</span> {scholarship.scholarshipfor[2]}</li>
                <li><span className="font-medium">Community:</span> {scholarship.scholarshipfor[3]}</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Scholarship Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{scholarship.likes} Likes</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                  <span>₹{scholarship.amt}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-purple-500" />
                  <span>{scholarship.period}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span>{format(scholarship.regstdate, 'PPP')} - {format(scholarship.regenddate, 'PPP')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">Description</h2>
          <p className="text-gray-700">{scholarship.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">Application Procedure</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {scholarship.procedures.map((procedure, index) => (
              <li key={index}>{procedure}</li>
            ))}
          </ol>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Applicants</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {//@ts-ignore
              applicants.map((student) => (
                <TableRow key={student.studentid}>
                  <TableCell className="font-medium">{student.student.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.student.studentDetails.currentQualification}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => console.log(`View details of student ${student.id}`)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}