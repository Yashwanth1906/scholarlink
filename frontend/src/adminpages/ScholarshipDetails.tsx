'use client'

import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, DollarSign, Users, ThumbsUp, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

type Scholarship = {
  id: string
  name: string
  eligibilityCriteria: {
    gender: string
    annualIncome: string
    studentType: string
    community: string
  }
  likes: number
  amount: number
  duration: string
  regStartDate: Date
  regEndDate: Date
  description: string
  procedures: string[]
}

type Student = {
  id: string
  name: string
  studentType: string
}

export  function ScholarshipDetails() {
  const router = useNavigate()

  const [scholarship, setScholarship] = useState<Scholarship | null>(null)
  const [applicants, setApplicants] = useState<Student[]>([])

  useEffect(() => {
    // Simulating API call to fetch scholarship details
    const fetchScholarshipDetails = async () => {
      // In a real application, you would fetch this data from your API using the id
      const mockScholarship: Scholarship = {
        id: '1',
        name: 'STEM Excellence Scholarship',
        eligibilityCriteria: {
          gender: 'Any',
          annualIncome: 'Below 5 Lakhs',
          studentType: 'UG',
          community: 'Any',
        },
        likes: 250,
        amount: 50000,
        duration: '1 year',
        regStartDate: new Date('2023-06-01'),
        regEndDate: new Date('2023-08-31'),
        description: 'This scholarship aims to support outstanding students pursuing STEM fields at the undergraduate level.',
        procedures: [
          'Submit online application',
          'Provide academic transcripts',
          'Write a personal statement',
          'Obtain two letters of recommendation',
        ],
      }
      setScholarship(mockScholarship)

      // Simulating API call to fetch applicants
      const mockApplicants: Student[] = [
        { id: '1', name: 'John Doe', studentType: 'Engineering' },
        { id: '2', name: 'Jane Smith', studentType: 'Medical' },
        { id: '3', name: 'Alice Johnson', studentType: 'Engineering' },
        { id: '4', name: 'Bob Williams', studentType: 'Higher Secondary' },
        { id: '5', name: 'Charlie Brown', studentType: 'PG' },
      ]
      setApplicants(mockApplicants)
    }


      fetchScholarshipDetails()

  }, [])

  if (!scholarship) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen w-screen absolute top-0 left-0 bg-gradient-to-b from-purple-100 to-blue-200 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{scholarship.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><span className="font-medium">Gender:</span> {scholarship.eligibilityCriteria.gender}</li>
                <li><span className="font-medium">Annual Income:</span> {scholarship.eligibilityCriteria.annualIncome}</li>
                <li><span className="font-medium">Student Type:</span> {scholarship.eligibilityCriteria.studentType}</li>
                <li><span className="font-medium">Community:</span> {scholarship.eligibilityCriteria.community}</li>
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
                  <span>₹{scholarship.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-purple-500" />
                  <span>{scholarship.duration}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span>{format(scholarship.regStartDate, 'PPP')} - {format(scholarship.regEndDate, 'PPP')}</span>
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
              {applicants.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.studentType}</Badge>
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