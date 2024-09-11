'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, CheckCircle, Clock, X } from 'lucide-react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { StudentNavbar } from '@/components/student-navbar'



const bookmarkedScholarships = [
  { id: 4, name: "Environmental Leaders Fund", providedBy: "Green Earth Foundation", amount: 5000, deadline: "2024-02-28", field: "Environmental Science", description: "Supporting future leaders in environmental science and sustainability." },
  { id: 5, name: "Future Entrepreneurs Grant", providedBy: "Business Leaders Association", amount: 12000, deadline: "2024-03-15", field: "Business", description: "For aspiring entrepreneurs with innovative business ideas." },
  { id: 6, name: "Arts Diversity Scholarship", providedBy: "Creative Minds Institute", amount: 8000, deadline: "2024-01-31", field: "Arts", description: "Promoting diversity and inclusion in the arts and creative fields." },
]



export function ScholarshipViewer() {
  const [activeTab, setActiveTab] = useState("applied")
  const [appliedScholarships, setAppliedScholarships]=useState([]);
  const [completedScholarships,setCompletedScholarships]=useState([]);
  const [loading,setLoading]=useState<boolean>(true)

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/student/scholarshipview`).then((data)=>{
      setAppliedScholarships(data.data.applied)
      setCompletedScholarships(data.data.completed)
      setLoading(false)
    })
  },[])

  if(loading)
  {
    return(
      <>
        loading...
      </>
    )
  }


  return (
    <div className="min-h-screen w-screen  absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <StudentNavbar />
      <br></br>
      <br></br>
      <br></br>
      

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          My Scholarships
        </motion.h1>

        <Tabs defaultValue="applied" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applied" onClick={() => setActiveTab("applied")}>Applied</TabsTrigger>
            <TabsTrigger value="bookmarked" onClick={() => setActiveTab("bookmarked")}>Bookmarked</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="applied">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {appliedScholarships.map((scholarship) => (
                <ScholarshipCard 
                  //@ts-ignore
                  key={scholarship.id}
                  scholarship={scholarship}
                  type="applied"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bookmarked">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {bookmarkedScholarships.map((scholarship) => (
                <ScholarshipCard 
                  key={scholarship.id}
                  scholarship={scholarship}
                  type="bookmarked"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {completedScholarships.map((scholarship) => (
                <ScholarshipCard 
                  //@ts-ignore
                  key={scholarship.id}
                  scholarship={scholarship}
                  type="completed"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link to={href} className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
      {children}
    </Link>
  )
}

function ScholarshipCard({ scholarship, type }: { scholarship: any, type: 'applied' | 'bookmarked' | 'completed' }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Awarded':
        return 'text-green-500';
      case 'Not Selected':
        return 'text-red-500';
      case 'Under Review':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Awarded':
        return <CheckCircle className="w-5 h-5 mr-2" />;
      case 'Not Selected':
        return <X className="w-5 h-5 mr-2" />;
      case 'Under Review':
        return <Clock className="w-5 h-5 mr-2" />;
      default:
        return <Clock className="w-5 h-5 mr-2" />;
    }
  }

  return (
    <Card className="flex flex-col h-full bg-white overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-purple-600">{scholarship.scholarship.name}</CardTitle>
        <CardDescription className="text-gray-600">{scholarship.scholarship.providedBy}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-4xl font-bold text-green-500">${scholarship.scholarship.amt}</div>
          <div className="text-gray-600">Deadline: {scholarship.scholarship.regenddate}</div>
          <div className="text-purple-600 font-semibold">{scholarship.scholarship.period +" "+"Years"}</div>
          <p className="text-gray-700">{scholarship.scholarship.description}</p>
          {(type === 'applied' || type === 'completed') && (
            <div className={`flex items-center font-semibold ${getStatusColor(scholarship.status)}`}>
              {getStatusIcon(scholarship.status)}
              Status: {scholarship.status}
            </div>
          )}
        </div>
        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
          {type === 'bookmarked' ? 'Apply Now' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  )
}