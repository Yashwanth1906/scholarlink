'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, DollarSign, Users, ThumbsUp, Calendar, Clock, Book, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import {Link, useNavigate} from "react-router-dom"

// Mock scholarship data
const scholarship = {
  id: 1,
  name: "Future Tech Leaders Scholarship",
  providedBy: "TechCorp Foundation",
  eligibility: "Undergraduate students in Computer Science",
  likes: 1250,
  amount: 10000,
  description: "This scholarship aims to support promising undergraduate students pursuing a degree in Computer Science. It covers tuition fees and provides a stipend for living expenses.",
  applicationDeadline: "2023-12-31",
  duration: "1 year",
  renewalCriteria: "Maintain a GPA of 3.5 or higher",
  coverageDetails: [
    "Full tuition fees",
    "Monthly stipend of $500",
    "Laptop allowance of $1000",
    "Conference attendance allowance"
  ],
  eligibilityCriteria: [
    "Enrolled in an accredited Computer Science program",
    "Minimum GPA of 3.2",
    "Demonstrated leadership skills",
    "Strong interest in emerging technologies"
  ],
  applicationProcess: [
    "Submit online application",
    "Provide academic transcripts",
    "Write a 500-word essay on your tech vision",
    "Obtain two letters of recommendation"
  ]
}

export function SingleScholarship() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleApply = () => {
    setIsDialogOpen(true)
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
            <CardDescription className="text-lg text-gray-600">Provided by: {scholarship.providedBy}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InfoItem icon={<Users />} label="Eligibility" value={scholarship.eligibility} />
                <InfoItem icon={<ThumbsUp />} label="Likes" value={scholarship.likes} />
                <InfoItem icon={<DollarSign />} label="Amount" value={`$${scholarship.amount.toLocaleString()}`} />
                <InfoItem icon={<Calendar />} label="Application Deadline" value={scholarship.applicationDeadline} />
                <InfoItem icon={<Clock />} label="Duration" value={scholarship.duration} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 mb-4">{scholarship.description}</p>
                <h3 className="text-lg font-semibold mb-2">Renewal Criteria</h3>
                <p className="text-gray-700">{scholarship.renewalCriteria}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Application Process</h3>
              <ol className="list-decimal list-inside text-gray-700">
                {scholarship.applicationProcess.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {scholarship.eligibilityCriteria.map((criteria, index) => (
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
              onClick={() => setIsDialogOpen(false)}
              className="mr-2"
            >
              Use Current Profile
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsDialogOpen(false)
                // Redirect to profile update page
                // You can replace this with actual navigation logic
                console.log("Redirecting to profile update page")
              }}
            >
              Update Profile
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