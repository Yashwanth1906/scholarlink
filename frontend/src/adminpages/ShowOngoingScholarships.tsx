'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, SearchIcon } from 'lucide-react'
import { format } from 'date-fns'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

type Scholarship = {

        "id": number,
        "name": string,
        "providedby": string,
        "image": string,
        "scholarshipfor": string[],
        "likes": number,
        "amt": number,
        "period": number,
        "regstdate": string,
        "regenddate": string,
        "description": string,
        "procedures": string[],
        "completed": false,
        "appliedScholarship": any
}

export  function AdminOngoingScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
//   const [searchTerm, setSearchTerm] = useState('')
    const [loading,setLoading]=useState<boolean>(true); 
    const navigate =useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/admin/ongoing`,{
        headers:{
            Authorization:localStorage.getItem("admintoken")
        }
    }).then((data)=>{
        setScholarships(data.data.scholarships)
        setLoading(false)
    })
    
  }, [])

  if(loading)
  {
    return(
        <>
        Loading..
        </>
    )
  }
//   const filteredScholarships = scholarships.filter(scholarship =>
//     scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

  const handleViewDetails = (id:number) => {
    navigate(`/admin/scholarshipdetails?id=${id}`);


  }

  return (
    <div className="min-h-screen w-screen absolute left-0 top-0 bg-gradient-to-b from-purple-100 to-blue-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">Ongoing Scholarships</h1>
        
        {/* <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-700">{scholarship.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-green-600 mb-4">
                  ₹{scholarship.amt}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Start: {format(scholarship.regstdate, 'PPP')}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>End: {format(scholarship.regenddate, 'PPP')}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleViewDetails(scholarship.id)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {scholarships.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No scholarships found matching your search.</p>
        )}
      </div>
    </div>
  )
}