'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GraduationCap, User, Mail, Calendar, Award, School, FileText, Download, DollarSign, MapPin } from 'lucide-react'
import { Link, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"

export function StudentProfile() {
  const [studentData,setStudentdata]=useState();
  const [search,]=useSearchParams();
  const [loading,setLoading]=useState<boolean>(true)

  

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/admin/getprofile?email=${search.get("id")}`,{
      headers:{
        Authorization:localStorage.getItem('admintoken')
      }
    }).then((data)=>{
      setStudentdata(data.data.student)
      console.log(data.data.student)
      setLoading(false)
    })
  },[])

  if(loading)
  {
    return(
      <>
      ...
      </>
    )
  }

  const renderEducationDetails = () => {
    // console.log(studentData.studentdetails)
    const  currentQualifications  = studentData.studentdetails[0].currentQualifications;
    // console.log(currentQualifications)
    const educationLevels = []
    if(studentData.secondarystudentDetails.length!=0)
    {
      educationLevels.push('secondary')
    }
    if(studentData.hscstudentdetails.length!=0)
      {
        educationLevels.push('higher_secondary')
      }
      if(studentData.ugcollegestudentdetails.length!=0)
        {
          educationLevels.push('undergraduate')
        }
        if(studentData.pgcollegestudentdetails.length!=0)
          {
            educationLevels.push('postgraduate')
          }


    const currentIndex = educationLevels.indexOf(currentQualifications)
    // console.log(currentIndex)
    return educationLevels.slice(0, currentIndex + 1).map((level, index) => (
      <Card key={level} className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-800">{level} Education</CardTitle>
        </CardHeader>
        <CardContent>
          {renderEducationFields(level)}
        </CardContent>
      </Card>
    ))
  }

  const renderEducationFields = (level) => {
    const fields = {
      secondary: [
        { name: 'schoolname', label: 'School Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'schoollocation', label: 'School Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'score', label: 'Score', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'annualScore', label: 'Annual Score', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'grade', label: 'Grade', icon: <Award className="w-5 h-5 text-purple-600" /> }
      ],
      higer_secondary: [
        { name: 'schoolname', label: 'School Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'schoollocation', label: 'School Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'sscgrade', label: 'SSC Grade', icon: <Award className="w-5 h-5 text-purple-600" /> }
      ],
      undergraduate: [
        { name: 'degree', label: 'Degree', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'discipline', label: 'Discipline', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'collegename', label: 'College Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'collegelocation', label: 'College Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'sscgrade', label: 'SSC Grade', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'hscgrade', label: 'HSC Grade', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'gpa', label: 'GPA', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'styear', label: 'Start Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> },
        { name: 'endyear', label: 'End Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> }
      ],
      postgraduate: [
        { name: 'degree', label: 'Degree', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'discipline', label: 'Discipline', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'collegename', label: 'College Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'collegelocation', label: 'College Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'ugcgpa', label: 'UG CGPA', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'styear', label: 'Start Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> },
        { name: 'endyear', label: 'End Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> }
      ]
    }
  
    let temp=""
    let val=studentData;
    if(level=='secondary')
    {
      temp="secondarystudentDetails"

    }
    else if(level=="higher_secondary")
    {
      temp="hscstudentdetails"
    }
    else if(level=="undergraduate")
    {
        temp="ugcollegestudentdetails"
    }
    else if(level=="postgraduate")
      {
          temp="pgcollegestudentdetails"

      }
      console.log(studentData.temp+"yuvasshhhhhh")
      // console.log(val)
    return (
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields[level].map((field) => (
           <InfoField
            key={field.name}
            icon={field.icon}
            label={field.label}
            value={studentData.temp[0]}
          />
        ))}
      </div>
    )
  }

  // const renderDocuments = () => {
  //   const { currentQualification } = studentData
  //   const documents = {
  //     Secondary: ['annualCard', 'bonafide', 'incomeCertificate', 'salarySlip'],
  //     HSC: ['sscMarksheet', 'bonafide', 'incomeCertificate', 'salarySlip'],
  //     Undergraduate: ['sscMarksheet', 'hscMarksheet', 'bonafide', 'incomeCertificate', 'salarySlip'],
  //     Postgraduate: ['sscMarksheet', 'hscMarksheet', 'ugDegreeCertificate', 'bonafide', 'incomeCertificate', 'salarySlip']
  //   }

  //   return documents[currentQualification].map((doc) => (
  //     <Card key={doc} className="flex flex-col items-center p-4">
  //       <div className="w-24 h-24 mb-4">
  //         <img src={studentData.documents[doc]} alt={doc} className="w-full h-full object-cover" />
  //       </div>
  //       <h3 className="text-lg font-semibold text-center mb-2">{doc}</h3>
  //       <div className="flex flex-col w-full space-y-2">
  //         <Button variant="outline" className="w-full">
  //           <FileText className="w-4 h-4 mr-2" /> View
  //         </Button>
  //         <Button variant="ghost" className="w-full">
  //           <Download className="w-4 h-4 mr-2" /> Download
  //         </Button>
  //       </div>
  //     </Card>
  //   ))
  // }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-purple-100 to-blue-200 absolute left-0 top-0">
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

      <main className="container mx-auto w-full md:w-2/3 px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Student Profile
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div>
                {/* <Avatar className="w-48 h-48">
                  <AvatarImage src={studentData.profilePicture} alt={studentData.name} />
                  <AvatarFallback>{studentData.name}</AvatarFallback>
                </Avatar> */}
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  icon={<User className="w-5 h-5 text-purple-600" />}
                  label="Name"
                  value={studentData.name}
                />
                <InfoField
                  icon={<GraduationCap className="w-5 h-5 text-purple-600" />}
                  label="Current Qualification"
                  value={studentData.studentdetails.currentQualifications}
                />
                <InfoField
                  icon={<Mail className="w-5 h-5 text-purple-600" />}
                  label="Email"
                  value={studentData.email}
                />
                <InfoField
                  icon={<Calendar className="w-5 h-5 text-purple-600" />}
                  label="Date of Birth"
                  value={studentData.studentdetails.dob}
                />
                <InfoField
                  icon={<DollarSign className="w-5 h-5 text-purple-600" />}
                  label="Annual Income"
                  value={studentData.studentdetails.annualIncome}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">Achievements</CardTitle>
          </CardHeader>
          {/* <CardContent>
            {studentData.studentdetails.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center mb-2">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <span>{achievement}</span>
              </div>
            ))}
          </CardContent> */}
        </Card>

        {renderEducationDetails()}

        {/* <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderDocuments()}
            </div>
          </CardContent>
        </Card> */}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 ScholarLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <Link to={href} className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
      {children}
    </Link>
  )
}

function InfoField({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div className="flex-grow">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <p className="mt-1">{value}</p>
      </div>
    </div>
  )
}