'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, Calendar, DollarSign, GraduationCap, School, MapPin, FileText, Upload, Award, Plus, X } from 'lucide-react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

const InputField = ({ label, name, icon, type = "text", value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  )
}

const SelectField = ({ label, name, icon, options, value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <Select value={value} onValueChange={(value) => onChange(name, value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const FileUpload = ({ label, name, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Upload className="w-4 h-4" />
        {label}
      </Label>
      <Input
        type="file"
        id={name}
        name={name}
        onChange={(e) => onChange(name, e.target.files[0])}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  )
}

const PersonalInfoCard = ({ profileData, updateProfileData, addAchievement, removeAchievement }) => (
  <Card className="mb-6">
    <CardHeader className="bg-purple-600 text-white">
      <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
    </CardHeader>
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectField
        label="Community"
        name="community"
        icon={<User className="w-4 h-4" />}
        options={[
          { value: 'general', label: 'General' },
          { value: 'obc', label: 'OBC' },
          { value: 'sc', label: 'SC' },
          { value: 'st', label: 'ST' },
          { value: 'other', label: 'Other' },
        ]}
        value={profileData.community}
        onChange={updateProfileData}
      />
      <InputField label="Father's Name" name="fatherName" icon={<User className="w-4 h-4" />} value={profileData.fatherName} onChange={updateProfileData} />
      <InputField label="Mother's Name" name="motherName" icon={<User className="w-4 h-4" />} value={profileData.motherName} onChange={updateProfileData} />
      <InputField label="Father's Occupation" name="fatherOccupation" icon={<User className="w-4 h-4" />} value={profileData.fatherOccupation} onChange={updateProfileData} />
      <InputField label="Mother's Occupation" name="motherOccupation" icon={<User className="w-4 h-4" />} value={profileData.motherOccupation} onChange={updateProfileData} />
      <InputField label="Guardian's Name" name="gaurdianName" icon={<User className="w-4 h-4" />} value={profileData.gaurdianName} onChange={updateProfileData} />
      <InputField label="Guardian's Occupation" name="gaurdianOccupation" icon={<User className="w-4 h-4" />} value={profileData.gaurdianOccupation} onChange={updateProfileData} />
      <InputField label="Parent Contact No" name="parentContactNo" icon={<Phone className="w-4 h-4" />} value={profileData.parentContactNo} onChange={updateProfileData} />
      <SelectField
        label="Student Type"
        name="studenttype"
        icon={<GraduationCap className="w-4 h-4" />}
        options={[
          { value: 'secondary', label: 'Secondary' },
          { value: 'higher_secondary', label: 'HSC' },
          { value: 'undergraduate', label: 'Undergraduate' },
          { value: 'postgraduate', label: 'Postgraduate' },
        ]}
        value={profileData.studenttype}
        onChange={updateProfileData}
      />
      <SelectField
        label="Gender"
        name="gender"
        icon={<User className="w-4 h-4" />}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        value={profileData.gender}
        onChange={updateProfileData}
      />
      <InputField label="Contact No" name="contactNo" icon={<Phone className="w-4 h-4" />} value={profileData.contactNo} onChange={updateProfileData} />
      <InputField label="Annual Income" name="annualIncome" icon={<DollarSign className="w-4 h-4" />} type="number" value={profileData.annualIncome} onChange={updateProfileData} />
      <InputField label="Date of Birth" name="dob" icon={<Calendar className="w-4 h-4" />} type="date" value={profileData.dob} onChange={updateProfileData} />
      <FileUpload label="First Graduate Certificate" name="firstGraduateCertificate" onChange={updateProfileData} />
      <div className="col-span-2">
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
          <Award className="w-4 h-4" />
          Achievements
        </Label>
        {profileData.achievements.map((achievement, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              value={achievement}
              onChange={(e) => updateProfileData('achievements', profileData.achievements.map((a, i) => i === index ? e.target.value : a))}
              className="flex-grow mr-2"
            />
            <Button
              onClick={() => removeAchievement(index)}
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          onClick={addAchievement}
          variant="outline"
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Achievement
        </Button>
      </div>
    </CardContent>
  </Card>
)

const SecondaryEducationCard = ({ profileData, updateProfileData }) => (
  <Card className="mb-6">
    <CardHeader className="bg-purple-600 text-white">
      <CardTitle className="text-xl font-bold">Secondary Education</CardTitle>
    </CardHeader>
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="School Name" name="schoolname" icon={<School className="w-4 h-4" />} value={profileData.schoolname} onChange={updateProfileData} />
      <InputField label="School Location" name="schoollocation" icon={<MapPin className="w-4 h-4" />} value={profileData.schoollocation} onChange={updateProfileData} />
      <InputField label="Score" name="score" icon={<FileText className="w-4 h-4" />} value={profileData.score} onChange={updateProfileData} />
      <FileUpload label="Annual Card" name="annualCard" onChange={updateProfileData} />
    </CardContent>
  </Card>
)

const HigherSecondaryEducationCard = ({ profileData, updateProfileData }) => (
  <Card className="mb-6">
    <CardHeader className="bg-purple-600 text-white">
      <CardTitle className="text-xl font-bold">Higher Secondary Education</CardTitle>
    </CardHeader>
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="SSC School Name" name="sscSchoolName" icon={<School className="w-4 h-4" />} value={profileData.sscSchoolName} onChange={updateProfileData} />
      <InputField label="SSC School Location" name="sscSchoolLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.sscSchoolLocation} onChange={updateProfileData} />
      <InputField label="HSC School Name" name="hscSchoolName" icon={<School className="w-4 h-4" />} value={profileData.hscSchoolName} onChange={updateProfileData} />
      <InputField label="HSC School Location" name="hscSchoolLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.hscSchoolLocation} onChange={updateProfileData} />
      <InputField label="SSC Grade" name="sscGrade" icon={<FileText className="w-4 h-4" />} value={profileData.sscGrade} onChange={updateProfileData} />
      <FileUpload label="SSC Marksheet" name="sscMarksheet" onChange={updateProfileData} />
      <InputField label="HSC Grade" name="hscGrade" icon={<FileText className="w-4 h-4" />} value={profileData.hscGrade} onChange={updateProfileData} />
      <FileUpload label="HSC Marksheet" name="hscMarksheet" onChange={updateProfileData} />
    </CardContent>
  </Card>
)

const UndergraduateEducationCard = ({ profileData, updateProfileData }) => (
  <Card className="mb-6">
    <CardHeader className="bg-purple-600 text-white">
      <CardTitle className="text-xl font-bold">Undergraduate Education</CardTitle>
    </CardHeader>
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="Degree" name="degree" icon={<GraduationCap className="w-4 h-4" />} value={profileData.degree} onChange={updateProfileData} />
      <InputField label="Discipline" name="discipline" icon={<GraduationCap className="w-4 h-4" />} value={profileData.discipline} onChange={updateProfileData} />
      <InputField label="SSC School Name" name="sscSchoolName" icon={<School className="w-4 h-4" />} value={profileData.sscSchoolName} onChange={updateProfileData} />
      <InputField label="SSC School Location" name="sscSchoolLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.sscSchoolLocation} onChange={updateProfileData} />
      <InputField label="HSC School Name" name="hscSchoolName" icon={<School className="w-4 h-4" />} value={profileData.hscSchoolName} onChange={updateProfileData} />
      <InputField label="HSC School Location" name="hscSchoolLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.hscSchoolLocation} onChange={updateProfileData} />
      <InputField label="UG College Name" name="ugCollegeName" icon={<School className="w-4 h-4" />} value={profileData.ugCollegeName} onChange={updateProfileData} />
      <InputField label="UG College Location" name="ugCollegeLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.ugCollegeLocation} onChange={updateProfileData} />
      <InputField label="SSC Grade" name="sscGrade" icon={<FileText className="w-4 h-4" />} value={profileData.sscGrade} onChange={updateProfileData} />
      <FileUpload label="SSC Marksheet" name="sscMarksheet" onChange={updateProfileData} />
      <InputField label="HSC Grade" name="hscGrade" icon={<FileText className="w-4 h-4" />} value={profileData.hscGrade} onChange={updateProfileData} />
      <FileUpload label="HSC Marksheet" name="hscMarksheet" onChange={updateProfileData} />
      <InputField label="GPA" name="gpa" icon={<FileText className="w-4 h-4" />} value={profileData.gpa} onChange={updateProfileData} />
      <InputField label="Start Year" name="stYear" icon={<Calendar className="w-4 h-4" />} value={profileData.stYear} onChange={updateProfileData} />
      <InputField label="End Year" name="endYear" icon={<Calendar className="w-4 h-4" />} value={profileData.endYear} onChange={updateProfileData} />
    </CardContent>
  </Card>
)

const PostgraduateEducationCard = ({ profileData, updateProfileData }) => (
  <Card className="mb-6">
    <CardHeader className="bg-purple-600 text-white">
      <CardTitle className="text-xl font-bold">Postgraduate Education</CardTitle>
    </CardHeader>
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="Degree" name="degree" icon={<GraduationCap className="w-4 h-4" />} value={profileData.degree} onChange={updateProfileData} />
      <InputField label="Discipline" name="discipline" icon={<GraduationCap className="w-4 h-4" />} value={profileData.discipline} onChange={updateProfileData} />
      <InputField label="SSC School Name" name="sscSchoolName" icon={<School className="w-4 h-4" />} value={profileData.sscSchoolName} onChange={updateProfileData} />
      <InputField label="SS School Location" name="sscSchoolLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.sscSchoolLocation} onChange={updateProfileData} />
      <InputField label="HSC School Name" name="hscSchoolName" icon={<School className="w-4 h-4" />} value={profileData.hscSchoolName} onChange={updateProfileData} />
      <InputField label="HSC School Location" name="hscSchoolLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.hscSchoolLocation} onChange={updateProfileData} />
      <InputField label="UG College Name" name="ugCollegeName" icon={<School className="w-4 h-4" />} value={profileData.ugCollegeName} onChange={updateProfileData} />
      <InputField label="UG College Location" name="ugCollegeLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.ugCollegeLocation} onChange={updateProfileData} />
      <InputField label="PG College Name" name="pgCollegeName" icon={<School className="w-4 h-4" />} value={profileData.pgCollegeName} onChange={updateProfileData} />
      <InputField label="PG College Location" name="pgCollegeLocation" icon={<MapPin className="w-4 h-4" />} value={profileData.pgCollegeLocation} onChange={updateProfileData} />
      <InputField label="SSC Grade" name="sscGrade" icon={<FileText className="w-4 h-4" />} value={profileData.sscGrade} onChange={updateProfileData} />
      <FileUpload label="SSC Marksheet" name="sscMarksheet" onChange={updateProfileData} />
      <InputField label="HSC Grade" name="hscGrade" icon={<FileText className="w-4 h-4" />} value={profileData.hscGrade} onChange={updateProfileData} />
      <FileUpload label="HSC Marksheet" name="hscMarksheet" onChange={updateProfileData} />
      <InputField label="UG CGPA" name="ugCgpa" icon={<FileText className="w-4 h-4" />} value={profileData.ugCgpa} onChange={updateProfileData} />
      <FileUpload label="UG Degree Certificate" name="ugDegreeCertificate" onChange={updateProfileData} />
      <InputField label="Start Year" name="stYear" icon={<Calendar className="w-4 h-4" />} value={profileData.stYear} onChange={updateProfileData} />
      <InputField label="End Year" name="endYear" icon={<Calendar className="w-4 h-4" />} value={profileData.endYear} onChange={updateProfileData} />
    </CardContent>
  </Card>
)

const DocumentsCard = ({ updateProfileData }) => (
  <Card className="mb-6">
    <CardHeader className="bg-purple-600 text-white">
      <CardTitle className="text-xl font-bold">Documents</CardTitle>
    </CardHeader>
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <FileUpload label="Aadhar Card" name="aadhaarCard" onChange={updateProfileData} />
      <FileUpload label="Ration Card" name="rationCard" onChange={updateProfileData} />
      <FileUpload label="Bonafide Certificate" name="bonafide" onChange={updateProfileData} />
      <FileUpload label="Income Certificate" name="incomeCertificate" onChange={updateProfileData} />
      <FileUpload label="Salary Slip" name="salarySlip" onChange={updateProfileData} />
    </CardContent>
  </Card>
)

export function StudentInformation() {
  const navigate=useNavigate();

  const [profileData, setProfileData] = useState({
    community: '',
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    gaurdianName: '',
    gaurdianOccupation: '',
    parentContactNo: '',
    studenttype: '',
    gender: '',
    contactNo: '',
    annualIncome: '',
    dob: '',
    firstGraduateCertificate: null,
    achievements: [],
    schoolname: '',
    schoollocation: '',
    score: '',
    annualCard: null,
    sscSchoolName: '',
    sscSchoolLocation: '',
    hscSchoolName: '',
    hscSchoolLocation: '',
    ugCollegeName: '',
    ugCollegeLocation: '',
    pgCollegeName: '',
    pgCollegeLocation: '',
    sscGrade: '',
    sscMarksheet: null,
    hscGrade: '',
    hscMarksheet: null,
    degree: '',
    discipline: '',
    gpa: '',
    ugCgpa: '',
    ugDegreeCertificate: null,
    stYear: '',
    endYear: '',
    aadhaarCard: null,
    rationCard: null,
    bonafide: null,
    incomeCertificate: null,
    salarySlip: null,
  });

  const updateProfileData = (name, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const addAchievement = () => {
    setProfileData(prevData => ({
      ...prevData,
      achievements: [...prevData.achievements, '']
    }))
  }

  const removeAchievement = (index) => {
    setProfileData(prevData => ({
      ...prevData,
      achievements: prevData.achievements.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(profileData)
    try {
      const formData = new FormData()
      profileData.achievements.forEach((achievement, index) => {
        formData.append(`achievements[${index}]`, achievement); 
      });
      for (const key in profileData) {
        if (key !== 'achievements') {  // Skip 'achievements' as it's handled separately
          if (profileData[key] instanceof File) {
            formData.append(key, profileData[key]);
          } else {
            formData.append(key, profileData[key]);
          }
        }
      }

      const res = await axios.post(`${BACKEND_URL}/api/student/addinformation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem("studenttoken")
        }
      })

      console.log(res)
      navigate("/student/ongoing")
    } catch (error) {
      console.error("Error submitting profile data:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoCard
            profileData={profileData}
            updateProfileData={updateProfileData}
            addAchievement={addAchievement}
            removeAchievement={removeAchievement}
          />
          {profileData.studenttype === 'secondary' && <SecondaryEducationCard profileData={profileData} updateProfileData={updateProfileData} />}
          {profileData.studenttype === 'higher_secondary' && <HigherSecondaryEducationCard profileData={profileData} updateProfileData={updateProfileData} />}
          {profileData.studenttype === 'undergraduate' && <UndergraduateEducationCard profileData={profileData} updateProfileData={updateProfileData} />}
          {profileData.studenttype === 'postgraduate' && <PostgraduateEducationCard profileData={profileData} updateProfileData={updateProfileData} />}
          <DocumentsCard updateProfileData={updateProfileData} />
          <Button type="submit" className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  )
}