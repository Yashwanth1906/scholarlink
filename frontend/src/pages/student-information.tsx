'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { GraduationCap, User, Mail, Calendar, MapPin, Upload, FileText, DollarSign } from 'lucide-react'
import {Link, useNavigate} from "react-router-dom"

export function StudentInformation() {
  const [studentType, setStudentType] = useState('Secondary')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    annualIncome: '',
    schoolName: '',
    schoolLocation: '',
    score: '',
    annualScore: '',
    grade: '',
    hscSchoolName: '',
    hscSchoolLocation: '',
    sscGrade: '',
    degree: '',
    discipline: '',
    collegeName: '',
    collegeLocation: '',
    gpa: '',
    hscGrade:'',
    ugcgpa: '',
    startYear: '',
    endYear: ''
  })
  const [documents, setDocuments] = useState({
    annualCard: null,
    sscMarksheet: null,
    hscMarksheet: null,
    ugDegreeCertificate: null,
    incomeCertificate: null,
    salarySlip: null,
    bonafide: null
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e:any, documentName:any) => {
    const file = e.target.files[0]
    setDocuments(prevDocs => ({
      ...prevDocs,
      [documentName]: file
    }))
  }

  const renderEducationFields = () => {
    switch (studentType) {
      case 'Secondary':
        return (
          <>
            <InputField icon={<GraduationCap />} label="School Name" name="schoolName" value={formData.schoolName} onChange={handleInputChange} />
            <InputField icon={<MapPin />} label="School Location" name="schoolLocation" value={formData.schoolLocation} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="Score" name="score" value={formData.score} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="Annual Score" name="annualScore" value={formData.annualScore} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="Grade" name="grade" value={formData.grade} onChange={handleInputChange} />
          </>
        )
      case 'HSC':
        return (
          <>
            <InputField icon={<GraduationCap />} label="School Name" name="hscSchoolName" value={formData.hscSchoolName} onChange={handleInputChange} />
            <InputField icon={<MapPin />} label="School Location" name="hscSchoolLocation" value={formData.hscSchoolLocation} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="SSC Grade" name="sscGrade" value={formData.sscGrade} onChange={handleInputChange} />
          </>
        )
      case 'Undergraduate':
        return (
          <>
            <InputField icon={<GraduationCap />} label="Degree" name="degree" value={formData.degree} onChange={handleInputChange} />
            <InputField icon={<GraduationCap />} label="Discipline" name="discipline" value={formData.discipline} onChange={handleInputChange} />
            <InputField icon={<GraduationCap />} label="College Name" name="collegeName" value={formData.collegeName} onChange={handleInputChange} />
            <InputField icon={<MapPin />} label="College Location" name="collegeLocation" value={formData.collegeLocation} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="SSC Grade" name="sscGrade" value={formData.sscGrade} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="HSC Grade" name="hscGrade" value={formData.hscGrade} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="GPA" name="gpa" value={formData.gpa} onChange={handleInputChange} />
            <InputField icon={<Calendar />} label="Start Year" name="startYear" value={formData.startYear} onChange={handleInputChange} />
            <InputField icon={<Calendar />} label="End Year" name="endYear" value={formData.endYear} onChange={handleInputChange} />
          </>
        )
      case 'Postgraduate':
        return (
          <>
            <InputField icon={<GraduationCap />} label="Degree" name="degree" value={formData.degree} onChange={handleInputChange} />
            <InputField icon={<GraduationCap />} label="Discipline" name="discipline" value={formData.discipline} onChange={handleInputChange} />
            <InputField icon={<GraduationCap />} label="College Name" name="collegeName" value={formData.collegeName} onChange={handleInputChange} />
            <InputField icon={<MapPin />} label="College Location" name="collegeLocation" value={formData.collegeLocation} onChange={handleInputChange} />
            <InputField icon={<FileText />} label="UG CGPA" name="ugcgpa" value={formData.ugcgpa} onChange={handleInputChange} />
            <InputField icon={<Calendar />} label="Start Year" name="startYear" value={formData.startYear} onChange={handleInputChange} />
            <InputField icon={<Calendar />} label="End Year" name="endYear" value={formData.endYear} onChange={handleInputChange} />
          </>
        )
      default:
        return null
    }
  }

  const renderDocumentUploads = () => {
    const documentList = {
      Secondary: ['annualCard', 'bonafide', 'incomeCertificate', 'salarySlip'],
      HSC: ['sscMarksheet', 'bonafide', 'incomeCertificate', 'salarySlip'],
      Undergraduate: ['sscMarksheet', 'hscMarksheet', 'bonafide', 'incomeCertificate', 'salarySlip'],
      Postgraduate: ['sscMarksheet', 'hscMarksheet', 'ugDegreeCertificate', 'bonafide', 'incomeCertificate', 'salarySlip']
    }
    //@ts-ignore
    return documentList[studentType].map(doc => (
      <div key={doc} className="mb-4">
        <Label htmlFor={doc} className="block text-sm font-medium text-gray-700 mb-1">
          {doc.charAt(0).toUpperCase() + doc.slice(1).replace(/([A-Z])/g, ' $1').trim()}
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id={doc}
            type="file"
            onChange={(e) => handleFileChange(e, doc)}
            className="flex-grow"
          />
          <Button variant="outline" size="icon">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        
        {//@ts-ignore 
          documents[doc] && <p className="text-sm text-green-600 mt-1">File selected: {documents[doc].name}</p>}
      </div>
    ))
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    // Here you would typically send the formData and documents to your backend
    console.log('Form Data:', formData)
    console.log('Documents:', documents)
    // Implement your form submission logic here
  }

  return (
    <div className="min-h-screen w-screen absolute left-0 right-0 top-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scholarships">Scholarships</NavLink>
            <NavLink href="/student-information">Student Information</NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          Student Information
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-800">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField icon={<User />} label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
                <InputField icon={<Mail />} label="Email" name="email" value={formData.email} onChange={handleInputChange} type="email" />
                <InputField icon={<Calendar />} label="Date of Birth" name="dob" value={formData.dob} onChange={handleInputChange} type="date" />
                <InputField icon={<DollarSign />} label="Annual Income" name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} type="number" />
                <div className="col-span-2">
                  <Label htmlFor="studentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Student Type
                  </Label>
                  <Select value={studentType} onValueChange={setStudentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                      <SelectItem value="HSC">HSC</SelectItem>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-800">Education Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderEducationFields()}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-800">Document Upload</CardTitle>
            </CardHeader>
            <CardContent>
              {renderDocumentUploads()}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Submit Information
            </Button>
          </div>
        </form>
      </main>

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
function InputField({ icon, label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="pl-10 w-full"
          placeholder={label}
        />
      </div>
    </div>
  )
}