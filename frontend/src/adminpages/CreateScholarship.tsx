'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PlusCircle, MinusCircle, CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import axios from 'axios'
import { AdminNavbar } from '@/components/admin-navbar'
import { BACKEND_URL } from '../../config'


function formatDate(date:any)
{
    return new Date(date).toISOString().substring(0,10);
}

export  function AdminScholarshipCreation() {
  const [scholarshipData, setScholarshipData] = useState({
    name: '',
    image: null,
    gender: 'any',
    annualIncome: 'any',
    studentType: 'any',
    community: 'any',
    prizeAmount: '',
    duration: '',
    regStartDate: null,
    regEndDate: null,
    description: '',
    procedures: ['']
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setScholarshipData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name:any, value:any) => {
    setScholarshipData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name:any, date:any) => {
    setScholarshipData(prev => ({ ...prev, [name]: date }))
  }

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0]
    setScholarshipData(prev => ({ ...prev, image: file }))
  }

  const handleProcedureChange = (index:any, value:any) => {
    const newProcedures = [...scholarshipData.procedures]
    newProcedures[index] = value
    setScholarshipData(prev => ({ ...prev, procedures: newProcedures }))
  }

  const addProcedure = () => {
    setScholarshipData(prev => ({ ...prev, procedures: [...prev.procedures, ''] }))
  }

  const removeProcedure = (index:any) => {
    const newProcedures = scholarshipData.procedures.filter((_, i) => i !== index)
    setScholarshipData(prev => ({ ...prev, procedures: newProcedures }))
  }

  const handleSubmit = async() => {
    //@ts-ignore
    scholarshipData["regStartDate"]=formatDate(scholarshipData["regStartDate"]);
    //@ts-ignore
    scholarshipData["regEndDate"]=formatDate(scholarshipData["regEndDate"]);
    console.log('Scholarship Data:', scholarshipData)
    try{
        const res=await axios.post(`${BACKEND_URL}/api/admin/createscholarship`,scholarshipData)
        console.log(res)
    }
    catch(err){
        alert("error")
    }

  }

  return (<>
    
    <div className="min-h-screen w-screen absolute left-0 top-0 bg-gradient-to-b from-purple-100 to-blue-200 p-4 md:p-8">
    <AdminNavbar/>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-purple-800">Create New Scholarship</CardTitle>
        </CardHeader>
        <CardContent>
          <div  className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name of the Scholarship</Label>
              <Input id="name" name="name" value={scholarshipData.name} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input id="image" name="image" type="file" onChange={handleImageUpload} accept="image/*" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" value={scholarshipData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income (in Lakhs)</Label>
                <Select name="annualIncome" value={scholarshipData.annualIncome} onValueChange={(value) => handleSelectChange('annualIncome', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Annual Income" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">Below 1 Lakh</SelectItem>
                    <SelectItem value="3">Below 3 Lakhs</SelectItem>
                    <SelectItem value="5">Below 5 Lakhs</SelectItem>
                    <SelectItem value="7">Below 7 Lakhs</SelectItem>
                    <SelectItem value="10">Below 10 Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentType">Student Type</Label>
                <Select name="studentType" value={scholarshipData.studentType} onValueChange={(value) => handleSelectChange('studentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Student Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="higherSecondary">Higher Secondary</SelectItem>
                    <SelectItem value="Engineering">Engineering Student</SelectItem>
                    <SelectItem value="Medical">Medical Student</SelectItem>
                    <SelectItem value="PG">PG Student</SelectItem>
                   
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="community">Community</Label>
                <Select name="community" value={scholarshipData.community} onValueChange={(value) => handleSelectChange('community', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Community" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="OC">OC</SelectItem>
                    <SelectItem value="BC">BC</SelectItem>
                    <SelectItem value="BCM">BCM</SelectItem>
                    <SelectItem value="MBC">MBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prizeAmount">Prize Amount</Label>
                <Input id="prizeAmount" name="prizeAmount" type="number" value={scholarshipData.prizeAmount} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration of Scholarship</Label>
                <Input id="duration" name="duration" value={scholarshipData.duration} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label>Registration Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!scholarshipData.regStartDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scholarshipData.regStartDate ? format(scholarshipData.regStartDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      //@ts-ignore
                      selected={scholarshipData.regStartDate}
                      onSelect={(date) => handleDateChange('regStartDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Registration End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!scholarshipData.regEndDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scholarshipData.regEndDate ? format(scholarshipData.regEndDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      //@ts-ignore
                      selected={scholarshipData.regEndDate}
                      onSelect={(date) => handleDateChange('regEndDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" name="description" value={scholarshipData.description} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label>Application Procedures</Label>
              {scholarshipData.procedures.map((procedure, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input 
                    value={procedure} 
                    onChange={(e) => handleProcedureChange(index, e.target.value)} 
                    placeholder={`Procedure ${index + 1}`}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeProcedure(index)}>
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addProcedure} className="mt-2">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Procedure
              </Button>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>
              Create Scholarship
            </Button>
          </div>
        </CardContent>
      </Card>
    </div></>
  )
}