'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, User, Mail, Calendar, Award, School, Edit, Trash, Plus, Save, X, Camera, DollarSign, FileText, Download, Upload, MapPin } from 'lucide-react'
import {Link} from "react-router-dom"

// Mock student data
const initialStudentData = {
  name: "John Doe",
  currentQualification: "Undergraduate",
  email: "john.doe@example.com",
  dob: "1999-05-15",
  annualIncome: "50000",
  profilePicture: "/placeholder.svg?height=200&width=200",
  achievements: [
    "First place in National Coding Competition 2022",
    "Published research paper on AI in International Journal of Computer Science"
  ],
  secondaryEducation: {
    schoolName: "City High School",
    schoolLocation: "New York",
    score: "92",
    annualScore: "95",
    grade: "A"
  },
  hscEducation: {
    schoolName: "State Higher Secondary School",
    schoolLocation: "Los Angeles",
    sscGrade: "A+"
  },
  undergraduateEducation: {
    degree: "Bachelor of Science",
    discipline: "Computer Science",
    collegeName: "University of Technology",
    collegeLocation: "San Francisco",
    sscGrade: "A+",
    hscGrade: "A",
    gpa: "3.8",
    startYear: 2019,
    endYear: 2023
  },
  postgraduateEducation: {
    degree: "Master of Science",
    discipline: "Artificial Intelligence",
    collegeName: "Tech Institute",
    collegeLocation: "Boston",
    ugcgpa: 3.9,
    startYear: 2023,
    endYear: 2025
  },
  documents: {
    annualCard: "/placeholder.svg?height=100&width=100",
    sscMarksheet: "/placeholder.svg?height=100&width=100",
    hscMarksheet: "/placeholder.svg?height=100&width=100",
    ugDegreeCertificate: "/placeholder.svg?height=100&width=100",
    incomeCertificate: "/placeholder.svg?height=100&width=100",
    salarySlip: "/placeholder.svg?height=100&width=100",
    bonafide: "/placeholder.svg?height=100&width=100"
  }
}

export function MyProfile() {
  const [studentData, setStudentData] = useState(initialStudentData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(initialStudentData)
  const fileInputRef = useRef(null)
  const documentInputRef = useRef(null)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(studentData)
  }

  const handleSave = () => {
    setStudentData(editedData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(studentData)
  }

  const handleInputChange = (e:any, field:any, subfield = null) => {
    if (subfield) {
      setEditedData({
        ...editedData,
        [field]: {
          //@ts-ignore
          ...editedData[field],
          [subfield]: e.target.value
        }
      })
    } else {
      setEditedData({
        ...editedData,
        [field]: e.target.value
      })
    }
  }

  const handleAchievementAdd = () => {
    setEditedData({
      ...editedData,
      achievements: [...editedData.achievements, ""]
    })
  }

  const handleAchievementChange = (index:any, value:any) => {
    const newAchievements = [...editedData.achievements]
    newAchievements[index] = value
    setEditedData({
      ...editedData,
      achievements: newAchievements
    })
  }

  const handleAchievementDelete = (index:any) => {
    const newAchievements = editedData.achievements.filter((_, i) => i !== index)
    setEditedData({
      ...editedData,
      achievements: newAchievements
    })
  }

  const handleProfilePictureChange = (e:any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedData({
          ...editedData,
          //@ts-ignore
          profilePicture: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDocumentChange = (documentName: any) => {
    //@ts-ignore
    const file = documentInputRef.current.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedData({
          ...editedData,
          documents: {
            ...editedData.documents,
            [documentName]: reader.result
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const renderEducationDetails = () => {
    const { currentQualification } = editedData
    const educationLevels = ['Secondary', 'HSC', 'Undergraduate', 'Postgraduate']
    const currentIndex = educationLevels.indexOf(currentQualification)

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

  const renderEducationFields = (level:any) => {
    const fields = {
      Secondary: [
        { name: 'schoolName', label: 'School Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'schoolLocation', label: 'School Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'score', label: 'Score', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'annualScore', label: 'Annual Score', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'grade', label: 'Grade', icon: <Award className="w-5 h-5 text-purple-600" /> }
      ],
      HSC: [
        { name: 'schoolName', label: 'School Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'schoolLocation', label: 'School Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'sscGrade', label: 'SSC Grade', icon: <Award className="w-5 h-5 text-purple-600" /> }
      ],
      Undergraduate: [
        { name: 'degree', label: 'Degree', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'discipline', label: 'Discipline', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'collegeName', label: 'College Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'collegeLocation', label: 'College Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'sscGrade', label: 'SSC Grade', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'hscGrade', label: 'HSC Grade', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'gpa', label: 'GPA', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'startYear', label: 'Start Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> },
        { name: 'endYear', label: 'End Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> }
      ],
      Postgraduate: [
        { name: 'degree', label: 'Degree', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'discipline', label: 'Discipline', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
        { name: 'collegeName', label: 'College Name', icon: <School className="w-5 h-5 text-purple-600" /> },
        { name: 'collegeLocation', label: 'College Location', icon: <MapPin className="w-5 h-5 text-purple-600" /> },
        { name: 'ugcgpa', label: 'UG CGPA', icon: <Award className="w-5 h-5 text-purple-600" /> },
        { name: 'startYear', label: 'Start Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> },
        { name: 'endYear', label: 'End Year', icon: <Calendar className="w-5 h-5 text-purple-600" /> }
      ]
    }

    return (
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //@ts-ignore
        { //@ts-ignore
          fields[level].map((field: any) => (
          <InfoField
            key={field.name}
            icon={field.icon}
            label={field.label}
            //@ts-ignore
            value={editedData[`${level.toLowerCase()}Education`][field.name]}
            isEditing={isEditing}
            onChange={(e:any) => handleInputChange(e, `${level.toLowerCase()}Education`, field.name)}
          />
        ))}
      </div>
    )
  }

  const renderDocuments = () => {
    const { currentQualification } = editedData
    const documents = {
      Secondary: ['annualCard', 'bonafide', 'incomeCertificate', 'salarySlip'],
      HSC: ['sscMarksheet', 'bonafide', 'incomeCertificate', 'salarySlip'],
      Undergraduate: ['sscMarksheet', 'hscMarksheet', 'bonafide', 'incomeCertificate', 'salarySlip'],
      Postgraduate: ['sscMarksheet', 'hscMarksheet', 'ugDegreeCertificate', 'bonafide', 'incomeCertificate', 'salarySlip']
    }
    //@ts-ignore
    return documents[currentQualification].map((doc) => (
      <Card key={doc} className="flex flex-col items-center p-4">
        <div className="w-24 h-24 mb-4">
          //@ts-ignore  
          <img src={ //@ts-ignore
            editedData.documents[doc]} alt={doc} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">{doc}</h3>
        <div className="flex flex-col w-full space-y-2">
          <Button variant="outline" className="w-full">
            <FileText className="w-4 h-4 mr-2" /> View
          </Button>
          <Button variant="ghost" className="w-full">
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
          {isEditing && (
            <Button
              variant="secondary"
              className="w-full"
              //@ts-ignore
              onClick={() => documentInputRef.current.click()}
            >
              <Upload className="w-4 h-4 mr-2" /> Change
            </Button>
          )}
        </div>
      </Card>
    ))
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

      <main className="container mx-auto w-2/3 px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          My Profile
        </motion.h1>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-purple-800">Personal Information</CardTitle>
            {!isEditing && (
              <Button onClick={handleEdit} variant="outline" className="flex items-center">
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
            )}
            {isEditing && (
              <div className="flex space-x-2">
                <Button onClick={handleSave} variant="default" className="flex items-center">
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex items-center">
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <Avatar className="w-48 h-48">
                  <AvatarImage src={editedData.profilePicture} alt={editedData.name} />
                  <AvatarFallback>{editedData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-2 right-2"
                    //@ts-ignore
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  icon={<User className="w-5 h-5 text-purple-600" />}
                  label="Name"
                  value={editedData.name}
                  isEditing={isEditing}
                  onChange={(e:any) => handleInputChange(e, 'name')}
                />
                <InfoField
                  icon={<GraduationCap className="w-5 h-5 text-purple-600" />}
                  label="Current Qualification"
                  value={editedData.currentQualification}
                  isEditing={isEditing}
                  onChange={(e:any) => handleInputChange(e, 'currentQualification')}
                  isSelect={true}
                  //@ts-ignore
                  options={['Secondary', 'HSC', 'Undergraduate', 'Postgraduate']}
                />
                <InfoField
                  icon={<Mail className="w-5 h-5 text-purple-600" />}
                  label="Email"
                  value={editedData.email}
                  isEditing={isEditing}
                  onChange={(e:any) => handleInputChange(e, 'email')}
                />
                <InfoField
                  icon={<Calendar className="w-5 h-5 text-purple-600" />}
                  label="Date of Birth"
                  value={editedData.dob}
                  isEditing={isEditing}
                  onChange={(e:any) => handleInputChange(e, 'dob')}
                  type="date"
                />
                <InfoField
                  icon={<DollarSign className="w-5 h-5 text-purple-600" />}
                  label="Annual Income"
                  value={editedData.annualIncome}
                  isEditing={isEditing}
                  onChange={(e:any) => handleInputChange(e, 'annualIncome')}
                  type="number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {editedData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center mb-2">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                {isEditing ? (
                  <div className="flex-grow flex items-center">
                    <Input
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      onClick={() => handleAchievementDelete(index)}
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <span>{achievement}</span>
                )}
              </div>
            ))}
            {isEditing && (
              <Button onClick={handleAchievementAdd} variant="outline" className="mt-2">
                <Plus className="w-4 h-4 mr-2" /> Add Achievement
              </Button>
            )}
          </CardContent>
        </Card>

        {renderEducationDetails()}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderDocuments()}
            </div>
            <Input
              type="file"
              ref={documentInputRef}
              className="hidden"
              //@ts-ignore
              onChange={() => handleDocumentChange(documentInputRef.current.name)}
              accept="application/pdf,image/*"
            />
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white py-8">
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
function InfoField({ icon, label, value, isEditing, onChange, type = "text", isSelect = false, options = [] }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div className="flex-grow">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {isEditing ? (
          isSelect ? (
            <Select value={value} onValueChange={(newValue) => onChange({ target: { value: newValue } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input type={type} value={value} onChange={onChange} className="mt-1" />
          )
        ) : (
          <p className="mt-1">{value}</p>
        )}
      </div>
    </div>
  )
}