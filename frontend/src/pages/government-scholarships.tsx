'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Search, DollarSign, Users, ChevronRight } from 'lucide-react'
import{Link,useNavigate} from "react-router-dom"
import { StudentNavbar } from '@/components/student-navbar'

// Mock data for government scholarships
const governmentScholarships = [
 
  {
    id: 1,
    name: "Pradhan Mantri Uchchatar Shiksha Protsahan (PM-USP)",
    description: "Central Sector Scheme of Scholarship for College and University students",
    amount: 12000,
    eligibilityCriteria: [
      " Minimum of 80% score in  Class 12th of 10+2 pattern or equivalent",
"Must be pursuing regular degree courses",
" The family income of the applicant should not exceed ₹4,50,000/- per annum"
    ],
    link:"https://www.myscheme.gov.in/schemes/csss-cus"
  },
  {
    id: 2,
    name: "National Means-cum-merit Scholarship Scheme",
    description: "The objective to award scholarships to meritorious students of economically weaker sections to arrest their drop out at class VIII and encourage them to continue their education at secondary stage",
    amount: 12000,
    eligibilityCriteria: [
      " The family income of the applicant should not exceed ₹3,50,000/- per annum",
      "The student must be studying in Government ,Government-aided and local body schools",
      "Student must pass the selection test with minimum of 55% score ",
      
    ],
    link:"https://dsel.education.gov.in/scheme/nmmss",
  },
 ,
  {
    id: 4,
    name: "National Scholarship Portal",
    description: "Scholarship Application Fresh  &  Renewal",
    amount: 50000,
    eligibilityCriteria: [
      "Citizen of India",
      "High school student and college students",
      "SC/ST,OBC & General can apply"
    ],
    link:"https://scholarships.gov.in/"
  },
  {
    id: 3,
    name: "TEACH Grant",
    description: "For students who intend to teach in a high-need field in a low-income area.",
    amount: 4000,
    eligibilityCriteria: [
      "U.S. citizen or eligible non-citizen",
      "Enrolled in a TEACH-Grant-eligible program",
      "Maintain a cumulative GPA of at least 3.25",
      "Complete TEACH Grant counseling",
      "Sign a TEACH Grant Agreement to Serve"
    ]
  }
]

export function GovernmentScholarships() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();
  

  const filteredScholarships = governmentScholarships.filter(scholarship =>
    //@ts-ignore
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //@ts-ignore
    scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen w-screen absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <StudentNavbar/>
      <br></br>
      <br></br>
      <br></br>
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center"
        >
          Government Scholarships
        </motion.h1>

        {/* <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship, index) => (
            <motion.div
                  //@ts-ignore
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-purple-800">{    //@ts-ignore
                    scholarship.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 mb-4">{
                      //@ts-ignore
                      scholarship.description}</p>
                    <div className="flex items-center justify-center mb-4">
                      
                      <span className="font-semibold  text-green-600">₹{    //@ts-ignore
                        scholarship.amount.toLocaleString()}</span>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">Eligibility Criteria:</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {    //@ts-ignore
                          scholarship.eligibilityCriteria.map((criteria, index) => (
                          <li key={index}>{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white" >
                    <a href={
                      //@ts-ignore
                      scholarship.link}> View Scholarship</a>
                    
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 ScholarLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}